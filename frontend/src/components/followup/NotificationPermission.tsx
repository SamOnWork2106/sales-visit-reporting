import { useState } from "react";
import { Bell } from "lucide-react";

import {
  getNotificationPermission,
  requestNotificationPermission,
} from "../../services/notificationService";




export default function NotificationPermission() {

  const [permission, setPermission] =
    useState(getNotificationPermission());


  if (
    permission === "granted" ||
    permission === "denied" ||
    permission === "unsupported"
  ) {
    return null;
  }


  const handleEnable = async () => {

    const result =
      await requestNotificationPermission();

    setPermission(result);
  };


  return (
    <div
      className="
        mb-5
        flex flex-col
        sm:flex-row
        sm:items-center
        justify-between
        gap-4
        rounded-xl
        border border-slate-200
        bg-white
        p-4
        shadow-sm
      "
    >

      <div className="flex gap-3">

        <Bell
          size={21}
          className="mt-0.5 text-teal-700"
        />

        <div>

          <p className="font-medium text-slate-900">
            Enable follow-up notifications
          </p>

          <p className="text-sm text-slate-500 mt-1">
            Allow notifications so you can be alerted
            about due customer follow-ups when supported
            by your device.
          </p>

        </div>

      </div>


      <button
        type="button"
        onClick={handleEnable}
        className="
          shrink-0
          rounded-lg
          bg-teal-700
          text-white
          px-4 py-2
          text-sm
          font-medium
          hover:bg-teal-800
        "
      >
        Enable Notifications
      </button>

    </div>
  );
}