import TextIntro from "@/components/panels/TextIntro";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchSettings } from "@/lib/cms";
import Link from "next/link";

export default async function AccessSituationPage() {
  const settings = await fetchSettings();

  return (
    <>
      <TextIntro
        title={"Accès et situation"}
        html={""}
        firstBlock={true}
        className="text-intro--margin"
      />

      <section className="access-content">
        <div className="access-content__text">
          <h2 className="access-content__title">Nous localiser</h2>
          {settings?.accessPage.accessIntroHtml ? (
            <div
              className="access-content__content"
              dangerouslySetInnerHTML={{
                __html: settings?.accessPage.accessIntroHtml,
              }}
            ></div>
          ) : (
            <></>
          )}

          {settings?.accessPage.accessMapLink ? (
            <Link
              href={settings?.accessPage.accessMapLink}
              target="_blank"
              className="access-content__map-link"
            >
              Voir l&apos;itinéraire
            </Link>
          ) : (
            <></>
          )}

          {settings?.accessPage.accessList ? (
            <>
              <Accordion type="single" collapsible>
                {settings?.accessPage.accessList.map((item, index) => (
                  <AccordionItem key={index} value={`access-item-${index}`}>
                    <AccordionTrigger>{item.accessName}</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                      <div
                        dangerouslySetInnerHTML={{ __html: item.html }}
                      ></div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}
