import { getBlogPosts } from "@/app/guide/utils";
import Link from "next/link";
import { CustomMDX } from "../mdx";

const Obiettivi = () => {
  const guide = getBlogPosts();
  return (
    <section id="obiettivi" className="overflow-hidden py-4 md:py-20 lg:py-4">
      <div className="container flex justify-center">
        <div className="px-4">
          <div className="mx-auto text-center">
            <h2 className="mb-3 text-2xl font-bold text-primary sm:text-3xl lg:text-2xl xl:text-3xl">
              OBIETTIVI
            </h2>
            <ul className="mb-10 text-xl">
              <li className="mb-4">
                Sfidarsi a recitare almeno 60’ di Daimoku al giorno
              </li>

              <li>Studiare insieme le guide di Sensei</li>
            </ul>

            {guide
              .sort((a, b) => {
                if (
                  new Date(a.metadata.publishedAt) >
                  new Date(b.metadata.publishedAt)
                ) {
                  return -1;
                }
                return 1;
              })
              .map((post) => {
                return (
                  <div
                    key={post.slug}
                    className="w-full space-x-0 md:space-x-2"
                  >
                    <div className="flex flex-col p-4">
                      <p className="text-primary font-bold  tracking-tight">
                        {post.metadata.title.toUpperCase()}
                      </p>
                      <p className="text-neutral-600 my-4  tracking-tight">
                        {post.metadata.summary}
                      </p>
                      <p className="text-neutral-600 tabular-nums">
                        <Link
                          href={post.metadata.link}
                          className="text-primary"
                        >
                          Link al messaggio completo
                        </Link>
                      </p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                      <CustomMDX source={post.content} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Obiettivi;
