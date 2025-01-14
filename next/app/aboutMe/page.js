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
                {workItem.map((work) => (
                  <div key={work.slug}>
                    {/* <h6>{work.title}</h6> */}
                    <h6>{work.arbetsroll}</h6>
                    <h6>{work.arbetsgivare}</h6>
                    <h6>{work.tid}</h6>
                    <ul>
                      {work.erfarenhet?.map((item, index) => (
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
