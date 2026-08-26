import { careersPage } from "@/content/pagesContent";
import { buildMetadata } from "@/utils/seo";
import { PageHero, ProseSection, FeatureGrid } from "@/components/sections";

/**
 * Careers.
 *
 * Culture sections are real content. The open-roles block is an honest empty
 * state rather than a job board — there are no vacancies, and inventing
 * listings would have real people applying for jobs that do not exist.
 */
export const metadata = buildMetadata(careersPage.meta);

export default function CareersPage() {
  return (
    <>
      <PageHero content={careersPage.hero} />
      <ProseSection content={careersPage.mission} id="mission" tone="raised" />
      <ProseSection content={careersPage.vision} id="vision" />
      <FeatureGrid content={careersPage.values} id="values" tone="raised" columns={4} />
      <ProseSection content={careersPage.people} id="people" />
      <ProseSection content={careersPage.openRoles} id="open-roles" tone="raised" centered />
    </>
  );
}
