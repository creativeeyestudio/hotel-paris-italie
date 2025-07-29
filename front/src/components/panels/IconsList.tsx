import React from "react";
import Icon from "../icons/Icon";

interface Service {
  serviceIcon: 'bathroom' | 'air' | 'wifi' | 'phone' | 'safe' | 'minibar' | 'television' | 'courtesyTray';
  serviceLabel: string;
  id: string | number; // <-- Ajoute un ID unique dans les données si possible
}

interface IconsListProps {
  serviceList: Service[];
}

const IconsList: React.FC<IconsListProps> = ({ serviceList }) => {
  
    if (!Array.isArray(serviceList) || serviceList.length === 0) return null;
    
    return (
        <section className="icons-list">
        {serviceList.map((service) => (
            <div className="icons-list__item" key={service.id}>
                <Icon type={service.serviceIcon} className="icons-list__icon" />
                <span className="icons-list__label">{service.serviceLabel}</span>
            </div>
        ))}
        </section>
    );
};

export default IconsList;
