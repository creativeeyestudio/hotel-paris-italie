'use client'

import { CircleX } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import toggleReservePopup from "@/lib/toggleReservePopup"

const ReservePopup = () => {
    return (
        <div className="reserve-popup reserve-popup--open">
            <div className="reserve-popup__container">
                <h2 className="reserve-popup__title">Réserver une chambre</h2>
                <form action="" method="post" className="reserve-popup__form">
                    <div className="reserve-popup__input reserve-popup__input--full">
                        <Label htmlFor="arriveDate">Date d&apos;arrivée</Label>
                        <Input type="date" id="arriveDate" name="arriveDate" />
                    </div>

                    <div className="reserve-popup__input reserve-popup__input--full">
                        <Label htmlFor="departDate">Date de départ</Label>
                        <Input type="date" id="departDate" name="departDate" />
                    </div>

                    <div className="reserve-popup__input reserve-popup__input--half">
                        <Label htmlFor="adults">Adultes</Label>
                        <Input type="number" id="adults" name="adults" min={0} />
                    </div>

                    <div className="reserve-popup__input reserve-popup__input--half">
                        <Label htmlFor="childs">Enfants</Label>
                        <Input type="number" id="childs" name="childs" min={0} />
                    </div>

                    <div className="reserve-popup__input reserve-popup__input--full">
                        <Button className="reserve-popup__btn--send">Réserver une chambre</Button>
                    </div>
                </form>
            </div>

            <Button variant="ghost" size={'lg'} onClick={() => toggleReservePopup()}>
                <CircleX color="#ffffff" strokeWidth={1} style={{ width: 40, height: 64}} />
            </Button>
            
        </div>
    )
}

export default ReservePopup