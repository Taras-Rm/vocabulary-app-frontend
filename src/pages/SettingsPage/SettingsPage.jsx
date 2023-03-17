import { message, Select, Spin, Typography } from "antd";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import s from "./SettingsPage.module.css";
import { getAuthenticatedUser } from "../../api/auth";
import { updateLanguage } from "../../api/user";
import { useTranslation } from "react-i18next";

function SettingsPage() {
  const { t, i18n } = useTranslation();

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery("me", getAuthenticatedUser, {
    retry: false,
  });

  const updateLanguageMutation = useMutation(updateLanguage, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("me");
      i18n.changeLanguage(data.language);

      message.success(t("settings.languageUpdateSuccess"));

    },
    onError: (error) => {
      message.error(error.response.data.message);
    },
  });

  const updateLanguageHandler = (value) => {
    updateLanguageMutation.mutate({
      language: value,
    });
  };

  if (isLoading) return <Spin spinning />;

  return (
    <div className={s.settingsPage}>
      <Typography.Title level={2}>{t("settings.title")}</Typography.Title>
      <div>
        <div>
          <Typography.Text style={{ marginRight: 20 }}>
            {t("settings.language")}
          </Typography.Text>
          <Select
            onChange={(v) => updateLanguageHandler(v)}
            value={data.user.settings.language}
            style={{ width: 200 }}
            options={[
              { label: t("languages.ukrainian"), value: "uk" },
              { label: t("languages.english"), value: "en" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
