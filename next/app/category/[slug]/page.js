import {
  getAllProjects,
  getCategoryItems,
  getFilteredProjects,
} from "@/lib/api";
import Image from "next/image";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Link from "next/link";
//Aktuella importer, bland annat funktionerna skapade i api.js

// async funktion som genererar statiska sidor för samtliga projekt baserat på project.slug
export async function generateStaticParams() {
  // hämtar alla projekt från funktionen och returnerar en lista med alla projekts slugs
  const allProjects = await getAllProjects();
  return allProjects.map((project) => ({
    slug: project.slug,
    //returnerar samtliga slug som en parameter för att visa sidor dynamiskt/rutt
  }));
}

export default async function filteredProjects({ params }) {
  const query = await getFilteredProjects(params.slug);
  // Hämtar data för filtrering  baserat på slug
  const filteredProject = query?.data?.categoryCollection?.items || [];
  //...och hämtar aktuellt/aktuella projekt  utifrån den datan
  const allCategories = await getCategoryItems();
  //hämtar alla kategorier från funktionen getCategoryItems() skapade i api

  return (
    <>
      <Navbar />
      <main>
        <div className="container-projekt-index">
          <h2>Filtrerade Projekt</h2>
          <div className="dropdown">
            <a
              className="btn dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Filtrera Projekten
            </a>
            <ul className="dropdown-menu">
              {allCategories.map((item, index) => (
                <li key={index}>
                  <a className="dropdown-item" href={`/category/${item.slug}`}>
                    {item.title}
                  </a>
                </li>
              ))}
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a className="dropdown-item" href={`/projects`}>
                  Alla projekt
                </a>
              </li>
            </ul>
          </div>
          <hr className="solid" />
          <div>
            {filteredProject.map((category) => (
              <div className="card mb-3" key={category.slug}>
                <div className="row g-0">
                  <div className="col-md-12">
                    <div className="card-body">
                      <h3 className="card-title">Kategori: {category.title}</h3>
                      <hr />
                      {category?.linkedFrom?.projectCollection?.items.map(
                        (project) => (
                          <div className="row g-0 mb-3" key={project.slug}>
                            <div className="col-md-4 d-flex align-items-center">
                              {project.projectImage && (
                                <Image
                                  src={project.projectImage.url}
                                  alt={
                                    project.projectImage.description ||
                                    "Projektbild saknas"
                                  }
                                  width={200}
                                  height={200}
                                  className="mx-auto rounded"
                                />
                              )}
                            </div>
                            <div className="col-md-8">
                              <div className="card-body">
                                <h5>{project.title}</h5>
                                <p>{project.summary}</p>
                                <p>
                                  Publicerat:{" "}
                                  {new Date(project.date).toLocaleDateString()}
                                </p>
                                <Link
                                  className="btn linkedin-btn"
                                  href={`/project/${project.slug}`}
                                >
                                  Till projektet
                                </Link>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
