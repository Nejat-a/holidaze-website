import "./Contact.css";
import { Button } from "../Button";
export const Contact = () => {
  return (
    <div className="contact-container">
      <div className="page-inner">
        <div className="contact-content">
          <div className="contact-row">
            <div className="contact-info">
              <h1>Conatct Us</h1>
              <p className="contact-info-p">
                Holidaze is one of the biggest hotel Company in Bergen, Norway.
                We have hundreds of hotels, Guesthouses and B&Bs. If you have
                any question, Please contact us.
              </p>
              <div className="contact-contact-icons">
                <div className="contact-contact-icons-left">
                  <i className="fas fa-phone-alt"></i> Phone
                </div>
                <div className="contact-contact-icons-right">
                  +47 88 99 00 00
                </div>
              </div>
              <div className="contact-contact-icons">
                <div className="contact-contact-icons-left">
                  <i class="far fa-envelope"></i> Email
                </div>
                <div className="contact-contact-icons-right">
                  helpdesk@holidaze.com
                </div>
              </div>
              <div className="contact-contact-icons">
                <div className="contact-contact-icons-left">
                  <i class="fas fa-map-marker-alt"></i> Address
                </div>
                <div className="contact-contact-icons-right">
                  Tufteveien 4, Bergen
                </div>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-control">
                <label>Name</label>
                <input type="text" />
              </div>
              <div className="form-control">
                <label>Email</label>
                <input type="email" />
              </div>
              <div className="form-control">
                <label>Message</label>
                <textarea />
              </div>
              <Button>Send</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
