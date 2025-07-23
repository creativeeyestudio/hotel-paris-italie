import LeafletContainer from "@/components/layout/LeafletContainer";
import { ImageWrapper } from "@/components/panels/ImageWrapper";
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

  console.log(settings);

  const canShowMap: boolean =
    settings?.accessPage.accessLat !== undefined &&
    settings?.accessPage.accessLong !== undefined &&
    settings?.contactDetails.adress !== undefined &&
    settings?.contactDetails.postcode !== undefined &&
    settings?.contactDetails.city !== undefined;

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
            <Accordion
              type="single"
              collapsible
              className="access-content__accordion"
            >
              {settings?.accessPage.accessList.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`access-item-${index}`}
                  className="access-content__accordion__item"
                >
                  <AccordionTrigger className="access-content__accordion__title">
                    {item.accessName}
                  </AccordionTrigger>
                  <AccordionContent className="access-content__accordion__content">
                    <div dangerouslySetInnerHTML={{ __html: item.html }}></div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <></>
          )}
        </div>

        {settings?.accessPage?.accessImage ? (
          <ImageWrapper
            className="access-content__image"
            url={
              process.env.NEXT_PUBLIC_API_URL +
              settings?.accessPage?.accessImage?.url
            }
          />
        ) : (
          <></>
        )}
      </section>

      {canShowMap ? (
        <LeafletContainer
          lat={settings?.accessPage.accessLat}
          long={settings?.accessPage.accessLong}
          adress={settings?.contactDetails.adress}
          postCode={settings?.contactDetails.postcode}
          city={settings?.contactDetails.city}
          className="map"
        />
      ) : (
        <></>
      )}
    </>
  );
}
