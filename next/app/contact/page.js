// import { useRouter } from 'next/router';
import { getContactItems } from "@/lib/api";
import Image from "next/image";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { notFound } from "next/navigation";
//Aktuella importer, bland annat funktionerna skapade i api.js

export default async function Contact() {
  const contactItem = await getContactItems();
  //hämtar data via funktionen getContactItems

  if (!contactItem) {
    notFound();
    //om det inte inte finns data att visas 404()
  }
  return (
    <>
      <Navbar />
      <main>
        <div id="container-contact">
          <h2>{contactItem[0].title}</h2>
          <div className="info-contact">
            <div className="image-contact">
              <Image
                src={contactItem[0].imageStartpage.url}
                alt={
                  contactItem[0].imageStartpage.description || "Bild på Sara"
                }
                width={800}
                height={800}
              />
            </div>
            <div id="text-contact">
              <h5>{contactItem[0].introText}</h5>
                {/* går in i mainText som är en richtext/json och mappar sedan igenom den för att skriva ut all data. Hade kunnat hårdkodat ut det men då krävs det att koda om det så fort textens längd/antal paragrafer ändras = inte dynamiskt och fint */}
              {contactItem[0].mainText.json.content.map((item, index) => (
                <p className="card-text" key={index}>
                  {item.content[0]?.value}
                </p>
              ))}
              <ul className="contact">
                <li>
                {/* target="_blank"
                // target _blank gör att länken öppnas i ett nytt fönster */}
                  <Link href={contactItem[0].externalLink} target="_blank">
                    <i className="fa-brands fa-linkedin fa-2x"></i>LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href={contactItem[0].externalLink2} target="_blank">
                    <i className="fa-brands fa-github fa-2x"></i>GitHub
                  </Link>
                </li>

                <li>
                  <Link href={contactItem[0].externalLink3} target="_blank">
                    <i className="fa-solid fa-envelope fa-2x"></i>Mail
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
