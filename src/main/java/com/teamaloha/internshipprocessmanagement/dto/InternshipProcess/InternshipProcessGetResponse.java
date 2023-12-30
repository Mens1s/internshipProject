package com.teamaloha.internshipprocessmanagement.dto.InternshipProcess;

import com.teamaloha.internshipprocessmanagement.enums.ProcessStatusEnum;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InternshipProcessGetResponse {

    private String fullName;

    private Date updateDate;

    private Integer id;

    private String tc;

    private String studentNumber;
    private Integer studentId;

    private String telephoneNumber;

    private Integer classNumber;

    private String position;

    private String internshipType;

    private Integer internshipNumber;

    private Date startDate;

    private Date endDate;

    private Integer companyId;

    private Integer departmentId;

    private String engineerMail;

    private String engineerName;

    private String choiceReason;

    private Boolean sgkEntry;

    private Boolean gssEntry;

    private Boolean editable;

    private String stajYeriFormuPath;

    private Boolean donem_ici;

    private String mufredatDurumuPath;

    private String transkriptPath;

    private String dersProgramıPath;

    private String stajRaporuPath;

    // @Enumerated(EnumType.STRING)
    private ProcessStatusEnum processStatus;

    private Boolean rejected;

    private String comment;
    private String companyName;
}
