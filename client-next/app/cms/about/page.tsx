"use client";
import { useEffect, useState } from "react";

import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { CmsBadge } from "@/components/cms/cms-badge";
import { Card, CardContent } from "@/components/ui/card";
import { CmsInputField } from "@/components/cms/cms-input-field";
import { CmsEditButton } from "@/components/cms/cms-edit-button";
import { cmsAbout, updateHomepage } from "@/lib/api/cmsAPI/about/about";
import { CmsTextareaField } from "@/components/cms/cms-textarea-field";
import { AboutEditModal } from "@/components/cms/modals/about-edit-modal";
import { HomepageEditModal } from "@/components/cms/modals/homepage-edit-modal";
import { ABOUT_PLACEHOLDER, type AboutData } from "@/lib/constants/placeholders/aboutPlaceholder";
import { HOMEPAGE_PLACEHOLDER, type HomepageData } from "@/lib/constants/placeholders/homepagePlaceholder";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData>(ABOUT_PLACEHOLDER);
  const [homepageData, setHomepageData] = useState<HomepageData>(HOMEPAGE_PLACEHOLDER);

  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isSavingHomepage, setIsSavingHomepage] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isHomepageModalOpen, setIsHomepageModalOpen] = useState(false);

  useEffect(() => {
    const retrieveAboutData = async () => {
      try {
        setIsLoading(true);
        const [fetchedHomepage, fetchedAbout] = await cmsAbout();

        setHomepageData(fetchedHomepage);
        setAboutData(fetchedAbout);
        setIsImageLoading(!!fetchedHomepage.bg_image_url);
      } catch (err) {
        console.error(err instanceof Error ? err.message : err);
      } finally {
        setIsLoading(false);
      }
    };

    retrieveAboutData();
  }, []);

  const updateHomepageData: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setHomepageData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const updateAboutData: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setAboutData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveHomepage = async (nextData: HomepageData, imageFile?: File | null) => {
    if (!nextData.id) {
      console.error("Homepage id is missing");
      return;
    }

    try {
      setIsSavingHomepage(true);
      const updated = await updateHomepage(
        nextData.id,
        {
          title: nextData.title,
          sub_title: nextData.sub_title,
          description: nextData.description,
        },
        imageFile,
      );
      setHomepageData(updated);
      if (updated.bg_image_url) {
        setIsImageLoading(true);
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
    } finally {
      setIsSavingHomepage(false);
    }
  };

  const handleSaveAbout = async (nextData: AboutData) => {
    // TODO: connect about update API here
    setAboutData(nextData);
  };

  return (
    <div className="w-full space-y-5">
      <Card className="rounded-cmscard border-cms-cardborder bg-cms-surface py-0 ring-0">
        {isLoading ? (
          <>
            <CardContent className="space-y-3 p-4 sm:p-6">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="aspect-video w-full rounded-xl" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="space-y-1.5">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-10 w-full rounded-cmsinput" />
                  </div>
                ))}
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <CardContent className="space-y-3 p-4 sm:px-6">
              <div className="mb-3 flex justify-between items-center gap-2">
                <CmsBadge tone="dark">Homepage</CmsBadge>
                <CmsEditButton label="Edit" aria-label="Edit homepage section" onClick={() => setIsHomepageModalOpen(true)} />
              </div>
              {homepageData.bg_image_url ? (
                <div className="relative aspect-video w-full overflow-hidden">
                  {isImageLoading ? <Skeleton className="absolute inset-0 rounded-xl" /> : null}
                  <Image
                    src={homepageData.bg_image_url}
                    alt={homepageData.title || "Homepage background"}
                    fill
                    className={cn("object-cover transition-opacity duration-300", isImageLoading ? "opacity-0" : "opacity-100 rounded-xl")}
                    sizes="(max-width: 768px) 100vw, 800px"
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => setIsImageLoading(false)}
                  />
                </div>
              ) : null}
              <CmsInputField value={homepageData.title} onChange={updateHomepageData} label="Title" name="title" readOnly={true} />
              <CmsInputField value={homepageData.sub_title} onChange={updateHomepageData} label="Sub Title" name="sub_title" readOnly={true} />
              <CmsInputField value={homepageData.description} onChange={updateHomepageData} label="Description" name="description" readOnly={true} />
            </CardContent>
          </>
        )}
      </Card>
      <div className="w-full">
        <Card className="rounded-cmscard border-cms-cardborder bg-cms-surface py-0 ring-0">
          {isLoading ? (
            <>
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Skeleton className="h-[21px] w-[68px] rounded-cmsinput" />
                </div>
                <Skeleton className="h-10 w-full rounded-cmsinput" />
              </CardContent>
            </>
          ) : (
            <>
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 flex justify-between items-center gap-2">
                  <CmsBadge tone="dark">About</CmsBadge>
                  <CmsEditButton label="Edit" aria-label="Edit about section" onClick={() => setIsAboutModalOpen(true)} />
                </div>
                <CmsTextareaField value={aboutData.org_about} onChange={updateAboutData} label="Organization About" name="organization name" readOnly={true} />
              </CardContent>
            </>
          )}
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card className="rounded-cmscard border-cms-cardborder bg-cms-surface py-0 ring-0">
          {isLoading ? (
            <>
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Skeleton className="h-[21px] w-[68px] rounded-cmsinput" />
                </div>
                <Skeleton className="h-10 w-full rounded-cmsinput" />
              </CardContent>
            </>
          ) : (
            <>
              <CardContent className="p-4 sm:p-6">
                <CmsTextareaField value={aboutData.mission} onChange={updateAboutData} label="Mission" name="mission" readOnly={true} />
              </CardContent>
            </>
          )}
        </Card>
        <Card className="rounded-cmscard border-cms-cardborder bg-cms-surface py-0 ring-0">
          {isLoading ? (
            <>
              <CardContent className="p-4 sm:p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Skeleton className="h-[21px] w-[68px] rounded-cmsinput" />
                </div>
                <Skeleton className="h-10 w-full rounded-cmsinput" />
              </CardContent>
            </>
          ) : (
            <CardContent className="p-4 sm:p-6">
              <CmsTextareaField value={aboutData.vision} onChange={updateAboutData} label="Vision" name="vision" readOnly={true} />
            </CardContent>
          )}
        </Card>
      </div>
      <HomepageEditModal open={isHomepageModalOpen} data={homepageData} onClose={() => setIsHomepageModalOpen(false)} onSave={handleSaveHomepage} isSaving={isSavingHomepage} />
      <AboutEditModal open={isAboutModalOpen} data={aboutData} onClose={() => setIsAboutModalOpen(false)} onSave={handleSaveAbout} />
    </div>
  );
}
