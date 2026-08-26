import { useState } from 'react';

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const ready = name.trim().length > 0 && /.+@.+\..+/.test(email) && msg.trim().length > 3;
  const formHint = touched && !ready ? 'Name, a real email, and a sentence.' : 'Goes straight to my inbox.';

  /** Same message as a mailto, so a failed send never costs someone their words. */
  const mailtoHref = `mailto:hello@graydonwasil.com?subject=${encodeURIComponent(
    `Message from ${name || 'the website'}`,
  )}&body=${encodeURIComponent(`${msg}\n\n— ${name} (${email})`)}`;

  const send = async () => {
    if (!ready) {
      setTouched(true);
      return;
    }

    // With no endpoint configured the form hands off to the visitor's mail
    // client rather than pretending to deliver.
    if (!CONTACT_ENDPOINT) {
      window.location.href = mailtoHref;
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message: msg }),
      });
      // A form backend answers 4xx for a rejected submission — without this
      // check a rejected message would still report as delivered.
      if (!res.ok) throw new Error(`Endpoint responded ${res.status}`);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setTouched(false);
    setName('');
    setEmail('');
    setMsg('');
  };

  return (
    <div className="cslide">
      <div className="cslide-lead">
        <h2 className="disp cslide-title">
          <span className="line">Say</span>
          <span className="line">something.</span>
        </h2>
        <p className="prose-lead">
          Questions, ideas, or an argument about which casting is the rarest &mdash; it all lands in
          the same inbox, and I answer everything.
        </p>
        <div className="linkstack mono">
          <a href="mailto:hello@graydonwasil.com">hello@graydonwasil.com</a>
          <a href="https://github.com/graydonwasil" target="_blank" rel="noreferrer">
            github.com/graydonwasil
          </a>
        </div>
      </div>

      <div className="formpanel glass">
        {status === 'sent' ? (
          <div className="formgrid" aria-live="polite">
            <span className="mono block-label">Sent</span>
            <h3 className="pt sent-title">Thanks &mdash; that&rsquo;s on its way.</h3>
            <p className="prose-lead">
              I read everything, usually within a day. If it&rsquo;s about a casting, expect a long
              reply.
            </p>
            <div>
              <button type="button" className="btn btn-secondary" onClick={reset}>
                Write another
              </button>
            </div>
          </div>
        ) : status === 'error' ? (
          <div className="formgrid" aria-live="assertive">
            <span className="mono block-label">Didn&rsquo;t send</span>
            <h3 className="pt sent-title">That one didn&rsquo;t get through.</h3>
            <p className="prose-lead">
              Something went wrong on the way to my inbox. Your message is still in the form &mdash;
              send it straight to me instead, or try again.
            </p>
            <div className="formfoot">
              <a className="btn btn-primary" href={mailtoHref}>
                Email it instead
              </a>
              <button type="button" className="btn btn-secondary" onClick={() => setStatus('idle')}>
                Try again
              </button>
            </div>
          </div>
        ) : (
          <div className="formgrid">
            <div className="contact-fields">
              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                className="input"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="What's on your mind?"
              />
            </div>
            <div className="formfoot">
              <button
                type="button"
                className="btn btn-primary"
                onClick={send}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending…' : 'Send it'}
              </button>
              <span
                className="mono formhint"
                data-warn={touched && !ready ? '1' : '0'}
                aria-live="polite"
              >
                {formHint}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
