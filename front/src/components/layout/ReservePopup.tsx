"use client";

import { CircleX, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import toggleReservePopup from "@/lib/toggleReservePopup";
import { useEffect } from "react";

const ReservePopup = () => {

  useEffect(() => {
  const inputsContent = document.querySelectorAll<HTMLElement>('.reserve-popup__input');

  const setAllInactive = () => {
    inputsContent.forEach(el => {
      el.classList.remove('reserve-popup__input--active');
      el.classList.add('reserve-popup__input--inactive');
    });
  };

  inputsContent.forEach(inputContent => {
    inputContent.addEventListener('click', e => {
      e.stopPropagation();

      inputsContent.forEach(el => {
        if (el !== inputContent) {
          el.classList.remove('reserve-popup__input--active');
          el.classList.add('reserve-popup__input--inactive');
        }
      });

      inputContent.classList.add('reserve-popup__input--active');
      inputContent.classList.remove('reserve-popup__input--inactive');
    });
  });

  document.addEventListener('click', () => {
    setAllInactive();
  });

  // Validation des inputs
  const inputs = document.querySelectorAll<HTMLInputElement>('.reserve-popup__input input');
  inputs.forEach(inputEl => {
    inputEl.addEventListener('input', () => {
      const isFilled = inputEl.value.trim() !== '';
      inputEl.parentElement?.classList.toggle('reserve-popup__input--valid', isFilled);
    });
  });

  return () => {
    document.removeEventListener('click', setAllInactive);
    inputsContent.forEach(inputContent => {
      inputContent.replaceWith(inputContent.cloneNode(true)); // cleanup listeners
    });
  };
}, []);

  return (
    <div className="reserve-popup reserve-popup--close">
      <div className="reserve-popup__container">
        <Button size={"default"} onClick={() => toggleReservePopup()} className="reserve-popup__btn--close-desktop">
          <X
            color="#ffffff"
            strokeWidth={1}
            style={{ width: 40, height: 40 }}
          />
        </Button>
        <form action="" method="post" className="reserve-popup__form">
          <div className="reserve-popup__input reserve-popup__input--inactive reserve-popup__input--full">
            <Label htmlFor="arriveDate">Date d&apos;arrivée</Label>
            <Input type="date" id="arriveDate" name="arriveDate" />
          </div>

          <div className="reserve-popup__input reserve-popup__input--inactive reserve-popup__input--full">
            <Label htmlFor="departDate">Date de départ</Label>
            <Input type="date" id="departDate" name="departDate" />
          </div>

          <div className="reserve-popup__input reserve-popup__input--inactive reserve-popup__input--half">
            <Label htmlFor="adults">Adultes</Label>
            <Input type="number" id="adults" name="adults" min={0} />
          </div>

          <div className="reserve-popup__input reserve-popup__input--inactive reserve-popup__input--half">
            <Label htmlFor="childs">Enfants</Label>
            <Input type="number" id="childs" name="childs" min={0} />
          </div>

          <div className="reserve-popup__input reserve-popup__input--full">
            <Button className="reserve-popup__btn--send">
              Réserver une chambre
            </Button>
          </div>
        </form>
      </div>

      <Button variant="link" size={"lg"} onClick={() => toggleReservePopup()} className="reserve-popup__btn--close-mobile">
        <CircleX
          color="#ffffff"
          strokeWidth={1}
          style={{ width: 40, height: 64 }}
        />
      </Button>
    </div>
  );
};

export default ReservePopup;
