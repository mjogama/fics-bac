import { useEffect, useState } from "react";

import { EMPTY_ABOUT } from "../../constants/placeholders";
import { fetchAbout } from "../../api/cms";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import InputField from "../../components/ui/InputField";

export default function About() {
  const [aboutData, setAboutData] = useState(EMPTY_ABOUT);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const retrieveAboutData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchAbout();

        setAboutData(res);
      } catch (err) {
        setIsLoading(false);
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    retrieveAboutData();
  }, []);

  const updateAboutData = async (e) => {
    e.preventDefault();
    setAboutData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-full space-y-5">
      <Card className="p-4 sm:p-6">
        {isLoading ? "Loading..." : <InputField value={aboutData.title} onChange={updateAboutData} label="Title" name="Title" />}
        <div className="space-y-3">
          {/* <p className="font-display text-lg font-semibold text-cms-ink">{isLoading ? "Loading..." : aboutData.description}</p> */}
          {isLoading ? "Loading..." : <InputField value={aboutData.description} onChange={updateAboutData} label="Title" name="Title" />}
          <p className="text-sm leading-relaxed text-cms-secondary">{isLoading ? "Loading..." : aboutData.mission}</p>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card className="p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-2">
            <Badge tone="dark">Mission</Badge>
          </div>
          <p className="text-sm leading-relaxed text-cms-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Card>
        <Card className="p-4 sm:p-6">
          <div className="mb-3 flex items-center gap-2">
            <Badge tone="light">Vision</Badge>
          </div>
          <p className="text-sm leading-relaxed text-cms-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Card>
      </div>
    </div>
  );
}
