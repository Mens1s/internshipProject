import React, { ReactNode } from "react";
import Table from "../../../components/Table";
import styled from "styled-components";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Input, Tag } from "antd";
import { useNavigate, Link } from "react-router-dom"; // Replace with the actual path
import type { ColumnsType } from "antd/es/table";
import { columns } from "./PastApplicationsTableColumns";
import ContentHeader from "../../../components/ContentHeader";
import { Text } from "../../../context/LanguageProvider";
import axios from "../../../services/axios";
import UseLanguage from "../../../hooks/useLanguage";
interface DataType {
  key: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
  tags: string[];
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
    tags: ["Onaylandı"],
  },
  {
    key: "2",
    name: "Jim Green",
    startDate: "18.08.2023",
    endDate: "18.08.2023",
    type: "Zorunlu",
    tags: ["Reddedildi"],
  },
  {
    key: "3",
    name: "John Brown",
    startDate: "03.07.2023",
    endDate: "03.07.2023",
    type: "Zorunlu",
    tags: ["Onay Bekliyor"],
  },
];

const PastApplications: React.FC = () => {
  const navigate = useNavigate(); // Assuming your custom hook is named usenavigate
  const { dictionary } = UseLanguage();
  const handleNewApplicationClick = () => {
    navigate("/ogrenci/create");
  };

  const enhancedColumns = columns?.map((column) => {
    const newColumn = { ...column };
    if (newColumn.title) {
      newColumn.title = dictionary[`${column.title}`]; // assuming dictionary is an object with translations
    }
    return newColumn;
  });

  axios
    .get("http://localhost:8000/api/internship-process/get-all", {})
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error("past application error:", error);
    });

  return (
    <div>
      <ContentHeader>
        <h2>
          <Text tid="myInternshipApplications" />
        </h2>
        <Button onClick={handleNewApplicationClick}>
          <PlusCircleOutlined /> <Text tid="createApplication" />
        </Button>
      </ContentHeader>
      <Table tableProps={{ columns: enhancedColumns, data }} />
    </div>
  );
};

export default PastApplications;
