// import { useRouter } from 'next/router';

import { getAboutItems, getWorkItems, getStartpageItems } from "@/lib/api";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { notFound } from "next/navigation";

export default async function About() {
  const aboutItem = await getAboutItems();
  console.log("aboutItem:", aboutItem);
  const workItem = await getWorkItems();
  console.log("workItem:", workItem);
  const introText = await getStartpageItems();
  console.log("introText:", introText[0]);

  if (!aboutItem) {
    notFound();
  }
  return (
    <>
      <Navbar />
      <main>
        <div className="container-om-mig">
          <h2>Sara Lindholm</h2>
          <div className="cardd mb-3">
            <div className="card-container">
              <div id="card-om-mig-text">
                <div>
                  {introText[0].mainText.json.content.map((item, index) => (
                    <p className="card-text" key={index}>
                      {item.content[0]?.value}
                    </p>
                  ))}
                </div>
                {/* <p>
                  {" "}
                  Jag är en frontendutvecklare med en passion för att skapa
                  användarvänliga och responsiva webbupplevelser. För närvarande
                  studerar jag vid IT-Högskolan och planerar att ta examen som
                  frontendutvecklare i juni 2025. Jag har arbetat med
                  teknologier som HTML, CSS, JavaScript, React, och WordPress.
                </p>
                <p>
                  När jag inte kodar, gillar jag att träna och tillbringa tid
                  med min familj. Jag är envis och målmedveten och tycker att
                  jag är bra på att se andra människors kompetenser och försöka
                  lära mig av dem.
                </p>
                <p>
                  Min motivation till karriärbytet grundas i min önskan att inte
                  bli stillastående; det finns alltid ett steg framåt och mer
                  att lära.
                </p> */}
              </div>
              <div className="card-body">
                <h4>Mina utbildningar</h4>
                {aboutItem.map((utbildning) => (
                  <div key={utbildning.slug}>
                    <h6>{utbildning.title}</h6>
                    <h6>{utbildning.utbildning}</h6>
                    <h6>{utbildning.tid}</h6>
                    <ul>
                      {utbildning.utbList?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="card-body">
                <h4>Mina Arbetslivserfarenheter</h4>
                {workItem.map((arbete) => (
                  <div key={arbete.slug}>
                    {/* <h6>{arbete.title}</h6> */}
                    <h6>{arbete.arbetsroll}</h6>
                    <h6>{arbete.arbetsgivare}</h6>
                    <h6>{arbete.tid}</h6>
                    <ul>
                      {arbete.erfarenhet?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
