import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./applicationCard";
import { useEffect } from "react";
import { getApplications } from "@/api/apiApplications";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

const CreatedApplications = () => {
  const { user } = useUser();

  const {
    loading: loadingApplications,
    data: applications,
    fn: fnApplications,
  } = useFetch(getApplications);

  useEffect(() => {
    if (user?.id) {
      fnApplications({
        user_id: user.id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  if (loadingApplications) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col gap-2">
      {applications && applications.length > 0 ? (
        applications.map((application) => {
          return (
            <ApplicationCard
              key={application?.id || Math.random()}
              application={application}
              isCandidate={true}
            />
          );
        })
      ) : (
        <div className="text-center py-8">
          {loadingApplications ? 'Loading applications...' : 'No applications found'}
        </div>
      )}
    </div>
  );
};

export default CreatedApplications;