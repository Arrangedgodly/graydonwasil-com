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
  const formHint = touched && !ready ? 'Add your name, email, and a short message.' : 'Sent directly to my inbox.';

  /** Same message as a mailto, so a failed send never costs someone their words. */
  const mailtoHref = `mailto:hello@graydonwasil.com?subject=${encodeURIComponent(
    `Message from ${name || 'the website'}`,
  )}&body=${encodeURIComponent(`${msg}\n\nFrom: ${name} (${email})`)}`;

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
          <span className="line">Let&rsquo;s talk</span>
          <span className="line">through it.</span>
        </h2>
        <p className="prose-lead">
          Tell me what you&rsquo;re building, what isn&rsquo;t working, or which Cars casting I
          catalogued wrong. I read every message.
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
            <h3 className="pt sent-title">Thanks. That&rsquo;s on its way.</h3>
            <p className="prose-lead">
              I usually reply within a day. If it&rsquo;s about a casting, expect a long answer.
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
            <h3 className="pt sent-title">That didn&rsquo;t reach my inbox.</h3>
            <p className="prose-lead">
              Your message is still here. Try again, or open it in your email app.
            </p>
            <div className="formfoot">
              <a className="btn btn-primary" href={mailtoHref}>
                Open in email
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
