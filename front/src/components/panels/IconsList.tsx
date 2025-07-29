"use client";

import React from "react";
import Icon from "../icons/Icon";
import { motion } from "framer-motion";

interface Service {
  serviceIcon:
    | "bathroom"
    | "air"
    | "wifi"
    | "phone"
    | "safe"
    | "minibar"
    | "television"
    | "courtesyTray";
  serviceLabel: string;
}

interface IconsListProps {
  serviceList: Service[];
}

const IconsList: React.FC<IconsListProps> = ({ serviceList }) => {
  if (!Array.isArray(serviceList) || serviceList.length === 0) return null;

  return (
    <section className="icons-list">
      {serviceList.map((service, index) => (
        <motion.div
          initial={{ y: 200, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.1 }}
          className="icons-list__item"
          key={index}
        >
          <Icon type={service.serviceIcon} className="icons-list__icon" />
          <span className="icons-list__label">{service.serviceLabel}</span>
        </motion.div>
      ))}
    </section>
  );
};

export default IconsList;
