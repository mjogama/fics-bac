"use client";

import { useEffect, useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CmsBadge } from "@/components/cms/cms-badge";
import { CmsEditButton } from "@/components/cms/cms-edit-button";
import { CmsInputField } from "@/components/cms/cms-input-field";
import { ContactEditModal } from "@/components/cms/modals/contact-edit-modal";
import { cmsContact, updateContact } from "@/lib/api/cmsAPI/contactUs/contactUs";
import { CONCERN_TYPES, CONCERNS_PLACEHOLDER, CONTACT_PLACEHOLDER, type ContactData, type ConcernMessage } from "@/lib/constants/placeholders/contactUsPlaceholder";

const AVATAR_COLORS = ["bg-cms-ink", "bg-cms-secondary", "bg-cms-muted2"];

const CONTACT_FIELDS: { key: keyof Omit<ContactData, "socials">; label: string }[] = [
  { key: "email", label: "Email" },
  { key: "location", label: "Location" },
  { key: "office_hours", label: "Office hours" },
];

const FILTER_OPTIONS = ["All", ...CONCERN_TYPES] as const;

type FilterOption = (typeof FILTER_OPTIONS)[number];

function FilterChip({ label, active, count, onClick }: { label: string; active: boolean; count?: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-cmspill border-[1.5px] border-cms-ink bg-cms-ink px-3 py-1.5 font-mono text-xs text-white"
          : "rounded-cmspill border-[1.5px] border-cms-inputborder bg-cms-surface px-3 py-1.5 font-mono text-xs text-cms-muted hover:bg-cms-rowhover"
      }>
      {label}
      {count !== undefined ? <span className={active ? "ml-1.5 opacity-70" : "ml-1.5 text-cms-muted2"}>{count}</span> : null}
    </button>
  );
}

function InboxSkeleton() {
  return (
    <CardContent className="p-4 sm:p-6">
      <Skeleton className="mb-4 h-5 w-16" />
      <div className="mb-4 flex flex-wrap gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-20 rounded-cmspill" />
        ))}
      </div>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="rounded-cmsinput border border-cms-divider p-4">
            <div className="flex items-start gap-3">
              <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-3 w-40" />
              </div>
            </div>
            <Skeleton className="mt-3 h-4 w-full" />
            <Skeleton className="mt-2 h-4 w-3/4" />
          </div>
        ))}
      </div>
    </CardContent>
  );
}

function ContactInfoSkeleton() {
  return (
    <CardContent className="p-4 sm:p-6">
      <Skeleton className="mb-4 h-5 w-28" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-10 w-full rounded-cmsinput" />
          </div>
        ))}
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-10 w-full rounded-cmsinput" />
          <Skeleton className="mt-2 h-10 w-full rounded-cmsinput" />
        </div>
      </div>
    </CardContent>
  );
}

export default function ContactPage() {
  const [contactData, setContactData] = useState<ContactData>(CONTACT_PLACEHOLDER);
  const [concernData, setConcernData] = useState<ConcernMessage[]>(CONCERNS_PLACEHOLDER);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isSavingContact, setIsSavingContact] = useState(false);

  useEffect(() => {
    const retrieveContact = async () => {
      try {
        setIsLoading(true);
        const [contact, concerns] = await cmsContact();

        setContactData(contact);
        setConcernData(concerns);
      } catch (err) {
        console.error(err instanceof Error ? err.message : err);
      } finally {
        setIsLoading(false);
      }
    };

    retrieveContact();
  }, []);

  const concernCounts = useMemo(() => {
    const counts: Record<string, number> = { All: concernData.length };

    for (const type of CONCERN_TYPES) {
      counts[type] = concernData.filter((concern) => concern.type === type).length;
    }

    return counts;
  }, [concernData]);

  const filteredConcerns = useMemo(() => {
    if (activeFilter === "All") return concernData;
    return concernData.filter((concern) => concern.type === activeFilter);
  }, [concernData, activeFilter]);

  const noopInputChange: React.ChangeEventHandler<HTMLInputElement> = () => {};

  const handleSaveContact = async (nextData: ContactData) => {
    if (!nextData.id) {
      console.error("Contact id is missing");
      return;
    }

    try {
      setIsSavingContact(true);
      const updated = await updateContact(nextData.id, {
        email: nextData.email,
        location: nextData.location,
        office_hours: nextData.office_hours,
        socials: nextData.socials,
      });
      setContactData(updated);
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
    } finally {
      setIsSavingContact(false);
    }
  };

  return (
    <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-6">
      <Card className="rounded-cmscard border-cms-cardborder bg-cms-surface py-0 ring-0">
        {isLoading ? (
          <InboxSkeleton />
        ) : (
          <CardContent className="p-4 sm:p-6">
            <h2 className="mb-4 font-display text-base font-bold text-cms-ink">Inbox</h2>

            <div className="mb-4 flex flex-wrap gap-2">
              {FILTER_OPTIONS.map((option) => (
                <FilterChip key={option} label={option} active={activeFilter === option} count={concernCounts[option]} onClick={() => setActiveFilter(option)} />
              ))}
            </div>

            <div className="space-y-4">
              {filteredConcerns.length === 0 ? (
                <p className="rounded-cmsinput border border-dashed border-cms-divider px-4 py-8 text-center text-sm text-cms-muted">
                  No messages{activeFilter !== "All" ? ` for ${activeFilter}` : ""}.
                </p>
              ) : (
                filteredConcerns.map((concern, index) => (
                  <div key={concern.id || index} className="rounded-cmsinput border border-cms-divider p-4 transition-colors hover:bg-cms-rowhover">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}>
                        {(concern.name || "?").charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-medium text-cms-ink">{concern.name || "Anonymous"}</p>
                            <CmsBadge tone="light">{concern.type}</CmsBadge>
                          </div>
                          {(concern.date || concern.time) && (
                            <div className="font-mono text-[10px] text-cms-muted sm:text-right">
                              {concern.date ? <p>DATE: {concern.date}</p> : null}
                              {concern.time ? <p>TIME: {concern.time}</p> : null}
                            </div>
                          )}
                        </div>
                        {concern.email ? <p className="mt-1 text-xs text-cms-muted">{concern.email}</p> : null}
                        {concern.subject ? <p className="mt-2 text-sm font-medium text-cms-ink">{concern.subject}</p> : null}
                        {concern.details ? <p className="mt-2 text-sm leading-relaxed text-cms-secondary">{concern.details}</p> : null}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        )}
      </Card>

      <Card className="h-fit self-start rounded-cmscard border-cms-cardborder bg-cms-surface py-0 ring-0">
        {isLoading ? (
          <ContactInfoSkeleton />
        ) : (
          <CardContent className="p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-2">
              <h2 className="font-display text-base font-bold text-cms-ink">Contact Info</h2>
              <CmsEditButton label="Edit" aria-label="Edit contact info" onClick={() => setIsContactModalOpen(true)} />
            </div>
            <div className="space-y-2">
              {CONTACT_FIELDS.map(({ key, label }) => (
                <CmsInputField key={key} label={label} name={key} value={contactData[key]} onChange={noopInputChange} readOnly />
              ))}
              <div className="space-y-2">
                <p className="mb-1.5 font-bold text-[10px] uppercase tracking-wide text-cms-labelfaint">Socials</p>
                {contactData.socials.length === 0 ? (
                  <CmsInputField label="" name="socials-empty" value="" onChange={noopInputChange} readOnly placeholder="No social links" />
                ) : (
                  contactData.socials.map((social, index) => (
                    <CmsInputField key={`${social}-${index}`} label={index === 0 ? "" : undefined} name={`social-${index}`} value={social} onChange={noopInputChange} readOnly />
                  ))
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <ContactEditModal open={isContactModalOpen} data={contactData} onClose={() => setIsContactModalOpen(false)} onSave={handleSaveContact} isSaving={isSavingContact} />
    </div>
  );
}
