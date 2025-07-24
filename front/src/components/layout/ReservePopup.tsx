"use client";

import { CircleX, X } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import toggleReservePopup from "@/lib/toggleReservePopup";
import { useEffect } from "react";

const ReservePopup = () => {
  useEffect(() => {
    const inputsContent = document.querySelectorAll<HTMLElement>(
      ".reserve-popup__input",
    );

    const setAllInactive = () => {
      inputsContent.forEach((el) => {
        // Sauf si c’est déjà validé, on le passe en inactive
        if (!el.classList.contains("reserve-popup__input--valid")) {
          el.classList.remove("reserve-popup__input--active");
          el.classList.add("reserve-popup__input--inactive");
        }
      });
    };

    // Gérer le clic sur chaque bloc input
    inputsContent.forEach((inputContent) => {
      inputContent.addEventListener("click", (e) => {
        e.stopPropagation();

        // Ne rien faire si le champ est déjà validé
        if (inputContent.classList.contains("reserve-popup__input--valid"))
          return;

        // Réinitialiser tous les autres (sauf ceux validés)
        inputsContent.forEach((el) => {
          if (!el.classList.contains("reserve-popup__input--valid")) {
            el.classList.remove("reserve-popup__input--active");
            el.classList.add("reserve-popup__input--inactive");
          }
        });

        // Activer celui cliqué
        inputContent.classList.add("reserve-popup__input--active");
        inputContent.classList.remove("reserve-popup__input--inactive");
      });
    });

    // Clic en dehors → tous en inactive sauf ceux validés
    document.addEventListener("click", () => {
      setAllInactive();
    });

    // Gestion du remplissage (validation)
    const inputs = document.querySelectorAll<HTMLInputElement>(
      ".reserve-popup__input input",
    );

    inputs.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        const isFilled = inputEl.value.trim() !== "";
        const parent = inputEl.parentElement;

        if (!parent) return;

        // Gérer valid
        parent.classList.toggle("reserve-popup__input--valid", isFilled);

        if (isFilled) {
          // Si validé, retirer active et inactive
          parent.classList.remove("reserve-popup__input--active");
          parent.classList.remove("reserve-popup__input--inactive");
        } else {
          // Si vidé, remettre inactif
          parent.classList.add("reserve-popup__input--inactive");
        }
      });
    });

    return () => {
      document.removeEventListener("click", setAllInactive);
      inputsContent.forEach((inputContent) => {
        inputContent.replaceWith(inputContent.cloneNode(true));
      });
    };
  }, []);

  return (
    <div className="reserve-popup reserve-popup--close">
      <div className="reserve-popup__container">
        <Button
          size={"default"}
          onClick={() => toggleReservePopup()}
          className="reserve-popup__btn--close-desktop"
        >
          <X
            strokeWidth={1}
            style={{ width: 40, height: 40 }}
          />
        </Button>

        <form action="" method="post" className="reserve-popup__form">
          <div className="reserve-popup__input reserve-popup__input--inactive reserve-popup__input--full">
            <Label htmlFor="arriveDate">Date d&apos;arrivée</Label>
            <Input
              type="date"
              id="arriveDate"
              name="arriveDate"
              placeholder="June 01, 2025"
            />
          </div>

          <div className="reserve-popup__input reserve-popup__input--inactive reserve-popup__input--full">
            <Label htmlFor="departDate">Date de départ</Label>
            <Input
              type="date"
              id="departDate"
              name="departDate"
              placeholder="June 01, 2025"
            />
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

      <Button
        variant="link"
        size={"sm"}
        onClick={() => toggleReservePopup()}
        className="reserve-popup__btn--close-mobile"
      >
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
