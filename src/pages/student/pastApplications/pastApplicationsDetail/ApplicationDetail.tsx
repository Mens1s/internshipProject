import React, { useEffect, useState } from "react";
import { Steps, Tag, Skeleton, Alert, Button } from "antd";
import styled from "styled-components";
import ActiveApplicationForm from "../../activeApplication/ActiveApplicationForm";
import ContentHeader from "src/components/ContentHeader";
import axios from "src/services/axios";
import ActiveApplicationViewForm from "../../activeApplication/ActiveApplicationViewForm";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Text } from "src/context/LanguageProvider";
import UseLanguage from "src/hooks/useLanguage";
import { HistoryOutlined, CalendarOutlined } from "@ant-design/icons";
import UploadReportsForm from "./UploadReportsForm";

const StepsContainer = styled.div`
  width: 100%;
`;

const StyledButton = styled(Button)`
  @media (max-width: 600px) {
    flex: 1;
  }

  display: flex;
  gap: 7px;
  justify-content: center;
  align-items: center;
`;

interface HeaderProps {
  showSteps?: boolean;
}
const Header = styled.div<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ showSteps }: any) => (showSteps ? "40px" : "10px")};
  margin-top: ${({ showSteps }: any) => (showSteps ? "40px" : "10px")};
`;

interface StepItem {
  title: string;
  description: string;
}

const ApplicationDetail = () => {
  const [data, setData] = useState<any>([]);
  const [showSteps, setShowSteps] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [editable, setEditable] = useState(false);
  const [stepItems, setStepItems] = useState<StepItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageTitle, setMessageTitle] = useState("");
  const [messageType, setMessageType] = useState<any>("error");
  const [comment, setComment] = useState<any>("");
  const [stepsStatus, setStepsStatus] = useState<any>("process");
  const [showMessage, setShowMessage] = useState(false);
  const [showLoadReports, setShowLoadReports] = useState(false);
  const [processStatus, setProcessStatus] = useState("FORM");
  const { id } = useParams();
  const { dictionary } = UseLanguage();
  const navigate = useNavigate();

  const location = useLocation();
  const isAcademician = location.pathname.includes("/akademisyen");

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("token");

    if (location.pathname.includes("ogrenci")) {
      axios
        .get("http://localhost:8000/api/internship-process/get-all", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((response: any) => {
          const index = response.data.internshipProcessList.findIndex(
            (item: any) => item.id == id
          );

          if (index !== -1) {
            const internshipProcess =
              response.data.internshipProcessList[index];
            const processStatus = internshipProcess.processStatus;
            const isRejected = internshipProcess.rejected;
            if (isRejected) {
              setShowSteps(true);
              setStepsStatus("error");
              setShowMessage(true);
              setMessageTitle(dictionary.applicationRejected);
              setMessageType("error");
              setComment(internshipProcess.comment);
            }
            if (processStatus === "FORM") {
              setCurrentStep(0);
              setShowSteps(false);
              setEditable(true);
            } else if (processStatus === "PRE1") {
              setShowSteps(true);
              setCurrentStep(1);
            } else if (processStatus === "PRE2") {
              setShowSteps(true);
              setCurrentStep(2);
            } else if (processStatus === "PRE3") {
              setShowSteps(true);
              setCurrentStep(3);
            } else if (processStatus === "PRE4") {
              setShowSteps(true);
              setCurrentStep(4);
            } else if (processStatus === "IN1") {
              setShowSteps(true);
              setCurrentStep(5);
              setStepsStatus("done");
              setShowMessage(true);
              setMessageTitle(dictionary.applicationApproved);
              setMessageType("success");
              setComment(internshipProcess.comment);
            } else if (processStatus === "POST") {
              setShowSteps(true);
              setCurrentStep(5);
              setStepsStatus("done");
              setShowLoadReports(true);
            } else {
              setShowSteps(false);
            }

            setStepItems([
              {
                title: dictionary.student,
                description: dictionary.applied,
              },
              {
                title: dictionary.internshipCommision,
                description: isRejected
                  ? dictionary.rejected
                  : processStatus == "PRE1"
                  ? dictionary.pending
                  : dictionary.approved,
              },
              {
                title: dictionary.department,
                description:
                  processStatus != "PRE2" && processStatus != "PRE1"
                    ? dictionary.approved
                    : dictionary.pending,
              },
              {
                title: dictionary.faculty,
                description: processStatus.includes("PRE")
                  ? dictionary.pending
                  : dictionary.approved,
              },
              {
                title: dictionary.deanery,
                description: processStatus.includes("PRE")
                  ? dictionary.pending
                  : dictionary.approved,
              },
            ]);

            setData(internshipProcess);
            setEditable(internshipProcess.editable);
          } else {
            console.log(`Internship process with id ${id} not found`);
          }
        })
        .catch((error) => {
          console.log("error:", error.response);
        })
        .finally(() => setLoading(false));
    } else if (location.pathname.includes("akademisyen")) {
      const academicianId = window.localStorage.getItem("id");

      if (location.state?.internshipProcessList) {
        const internshipProcessList = location.state?.internshipProcessList;
        const processId = location.state?.processId;
        const internshipProcess = internshipProcessList.find(
          (process: any) => process.id === processId
        );
        setData(internshipProcess);
        setLoading(false);

        const processStatus = internshipProcess.processStatus;
        const isRejected = internshipProcess.rejected;

        if (isRejected) {
          setShowSteps(true);
          setStepsStatus("error");
          setShowMessage(true);
          setMessageTitle("Başvuru Reddedildi");
          setMessageType("error");
        }
        if (processStatus === "FORM") {
          setCurrentStep(0);
          setShowSteps(false);
          setEditable(true);
        } else if (processStatus === "PRE1") {
          setShowSteps(true);
          setCurrentStep(1);
        } else if (processStatus === "PRE2") {
          setShowSteps(true);
          setCurrentStep(2);
        } else if (processStatus === "PRE3") {
          setShowSteps(true);
          setCurrentStep(3);
        } else if (processStatus === "PRE4") {
          setShowSteps(true);
          setCurrentStep(4);
        } else if (processStatus === "IN1") {
          setShowSteps(true);
          setStepsStatus("done");
          setShowMessage(true);
          setMessageTitle("Başvuru Onaylandı");
          setMessageType("success");
        }

        setStepItems([
          {
            title: "Öğrenci",
            description: "Başvuru yapıldı",
          },
          {
            title: "Staj Komisyonu",
            description: isRejected
              ? dictionary.rejected
              : processStatus == "PRE1"
              ? "Onay Bekliyor"
              : "Onaylandı",
          },
          {
            title: "Bölüm",
            description:
              processStatus != "PRE2" && processStatus != "PRE1"
                ? "Onaylandı"
                : "Onay Bekliyor",
          },
          {
            title: "Fakülte",
            description: processStatus.includes("PRE")
              ? "Onay Bekliyor"
              : "Onaylandı",
          },
          {
            title: "Dekanlık",
            description: processStatus.includes("PRE")
              ? "Onay Bekliyor"
              : "Onaylandı",
          },
        ]);
        setEditable(internshipProcess.editable);
      } else {
        axios
          .post(
            "http://localhost:8000/api/internship-process/get-all-process-assigned",
            null,
            {
              params: {
                academicianId: academicianId,
              },
            }
          )
          .then((response) => {
            const index = response.data.internshipProcessList.findIndex(
              (item: any) => item.id == id
            );

            if (index !== -1) {
              const internshipProcess =
                response.data.internshipProcessList[index];
              const processStatus = internshipProcess.processStatus;
              const isRejected = internshipProcess.rejected;

              if (isRejected) {
                setShowSteps(true);
                setStepsStatus("error");
                setShowMessage(true);
                setMessageTitle("Başvuru Reddedildi");
                setMessageType("error");
              }
              if (processStatus === "FORM") {
                setCurrentStep(0);
                setShowSteps(false);
                setEditable(true);
              } else if (processStatus === "PRE1") {
                setShowSteps(true);
                setCurrentStep(1);
              } else if (processStatus === "PRE2") {
                setShowSteps(true);
                setCurrentStep(2);
              } else if (processStatus === "PRE3") {
                setShowSteps(true);
                setCurrentStep(3);
              } else if (processStatus === "PRE4") {
                setShowSteps(true);
                setCurrentStep(4);
              } else if (processStatus === "IN1") {
                setShowSteps(true);
                setStepsStatus("done");
                setShowMessage(true);
                setMessageTitle("Başvuru Onaylandı");
                setMessageType("success");
              } else {
                setShowSteps(false);
              }

              setStepItems([
                {
                  title: "Öğrenci",
                  description: "Başvuru yapıldı",
                },
                {
                  title: "Staj Komisyonu",
                  description: isRejected
                    ? dictionary.rejected
                    : processStatus == "PRE1"
                    ? "Onay Bekliyor"
                    : "Onaylandı",
                },
                {
                  title: "Bölüm",
                  description:
                    processStatus != "PRE2" && processStatus != "PRE1"
                      ? "Onaylandı"
                      : "Onay Bekliyor",
                },
                {
                  title: "Fakülte",
                  description: processStatus.includes("PRE")
                    ? "Onay Bekliyor"
                    : "Onaylandı",
                },
                {
                  title: "Dekanlık",
                  description: processStatus.includes("PRE")
                    ? "Onay Bekliyor"
                    : "Onaylandı",
                },
              ]);

              setData(internshipProcess);
              setEditable(internshipProcess.editable);
            } else {
              console.log(`Internship process with id ${id} not found`);
            }

            setLoading(false);
          })
          .catch((error) => {
            console.log("get all assigned error:");
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
  }, []);

  const isInEvaluatePage = location.pathname.split("/").includes("evaluate");

  return (
    <div>
      <ContentHeader>
        <h2>
          <Text tid="applicationDetails" />
        </h2>

        {isAcademician && isInEvaluatePage && (
          <StyledButton
            onClick={() =>
              navigate(`/akademisyen/${data.studentId}/internships`)
            }
            disabled={loading}
          >
            <HistoryOutlined />
            <Text tid="pastInternships" />
          </StyledButton>
        )}

        {!isAcademician && (
          <StyledButton
          /*   disabled={!canCreateNewForm}
            loading={createLoading}
            onClick={handleInit} */
          >
            <CalendarOutlined />
            Extend Internship
          </StyledButton>
        )}
      </ContentHeader>
      {showMessage && (
        <Alert
          message={messageTitle}
          description={comment && `Akademisyen Notu: ${comment}`}
          type={messageType}
          showIcon
          style={{ marginBottom: 20 }}
          closable
        />
      )}
      {/*   burası showLoadReports olacak */}
      {!loading && !isAcademician && true && <UploadReportsForm />}
      <Header showSteps={showSteps}>
        {showSteps && (
          <StepsContainer>
            <Steps
              size="small"
              current={currentStep}
              status={stepsStatus}
              items={stepItems}
            />
          </StepsContainer>
        )}
      </Header>
      {loading ? (
        <Skeleton active />
      ) : editable && !isAcademician ? (
        <ActiveApplicationForm data={data} />
      ) : (
        <ActiveApplicationViewForm data={data} />
      )}
    </div>
  );
};

export default ApplicationDetail;
