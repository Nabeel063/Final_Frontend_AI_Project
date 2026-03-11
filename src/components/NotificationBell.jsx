import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import useSocket from "../utils/useSocket";
import { baseUrl } from "../utils/ApiConstants.jsx";

export default function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
  const [loadingMarkAll, setLoadingMarkAll] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const getToken = () =>
    localStorage.getItem("token") ||
    localStorage.getItem("adminToken") ||
    localStorage.getItem("candidateToken") ||
    localStorage.getItem("superAdminToken");

  const fetchNotifications = async (cancelledRef) => {
    if (!userId) return;
    try {
      const token = getToken();
      const res = await axios.get(`${baseUrl}/notifications/get-notify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const arr = Array.isArray(res.data) ? res.data : res.data?.data || [];
      if (!cancelledRef.cancelled) setNotifications(arr);
    } catch (err) {
      console.error("Error fetching notifications:", err?.response?.status, err?.message);
    }
  };

  useEffect(() => {
    const cancelledRef = { cancelled: false };
    fetchNotifications(cancelledRef);
    return () => {
      cancelledRef.cancelled = true;
    };
  }, [userId]);

  useSocket(userId, (data) => {
    setNotifications((prev) => [data, ...prev]);
  });

  useEffect(() => {
    if (showDropdown && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [showDropdown]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!showDropdown) return;
      if (buttonRef.current?.contains(e.target)) return;
      if (dropdownRef.current?.contains(e.target)) return;
      setShowDropdown(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDropdown]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const markAllAsRead = async () => {
    setLoadingMarkAll(true);
    try {
      const token = getToken();
      await axios.patch(
        `${baseUrl}/notifications/mark-all-read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const cancelledRef = { cancelled: false };
      await fetchNotifications(cancelledRef);
    } catch (err) {
      console.error("Mark all read failed:", err?.response?.status, err?.message);
      alert("Error: " + (err?.response?.data?.error || err?.message || "Mark all as read failed"));
    } finally {
      setLoadingMarkAll(false);
    }
  };

  const detectKind = (notif) => {
    const rawType = (notif?.type || notif?.category || notif?.notifyType || "").toLowerCase();
    if (rawType.includes("candidate")) return "candidate";
    if (rawType.includes("offer")) return "offer";
    const msg = (notif?.message || "").toLowerCase();
    if (msg.includes("candidate")) return "candidate";
    if (msg.includes("offer")) return "offer";
    return "general";
  };

  const parseMessage = (notif) => {
    const kind = detectKind(notif);
    const message = notif?.message || "";
    let title = message;
    let name = "";
    let detail = "";

    const parts = message.split(":");
    if (parts.length >= 2) {
      title = parts[0].trim();
      const rest = parts.slice(1).join(":").trim();
      if (rest.toLowerCase().includes(" for ")) {
        const [n, d] = rest.split(/ for /i);
        name = (n || "").trim();
        detail = (d || "").trim();
      } else {
        detail = rest;
      }
    }

    if (!title) {
      title =
        kind === "candidate"
          ? "New candidate applied"
          : kind === "offer"
            ? "New Offer assigned"
            : "Notification";
    }

    return { kind, title, name, detail };
  };

  const formatDateTime = (dateLike) => {
    if (!dateLike) return "";
    const d = new Date(dateLike);
    if (Number.isNaN(d.getTime())) return "";
    const date = d
      .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
      .replaceAll("/", "-");
    const time = d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${date} | ${time}`;
  };

  const counts = useMemo(() => {
    const all = notifications.length;
    const candidate = notifications.filter((n) => detectKind(n) === "candidate").length;
    const offer = notifications.filter((n) => detectKind(n) === "offer").length;
    return { all, candidate, offer };
  }, [notifications]);

  const filteredNotifications = useMemo(() => {
    if (activeTab === "candidate")
      return notifications.filter((n) => detectKind(n) === "candidate");
    if (activeTab === "offer") return notifications.filter((n) => detectKind(n) === "offer");
    return notifications;
  }, [notifications, activeTab]);

  const leftBarColor = (kind) => {
    if (kind === "offer") return "bg-[#EC4899]";
    if (kind === "candidate") return "bg-[#6D28D9]";
    return "bg-[#9CA3AF]";
  };

  const KindIcon = ({ kind }) => {
    if (kind === "offer") {
      return (
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#FCE7F3]">
          <svg className="h-5 w-5 text-[#EC4899]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </span>
      );
    }
    return (
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[#EDE9FE]">
        <svg className="h-5 w-5 text-[#6D28D9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11c1.657 0 3 1.343 3 3v3H5v-3c0-1.657 1.343-3 3-3m8 0a4 4 0 10-8 0 4 4 0 008 0z"
          />
        </svg>
      </span>
    );
  };

  const TabBtn = ({ k, label, count }) => {
    const active = activeTab === k;
    return (
      <button
        type="button"
        onClick={() => setActiveTab(k)}
        className={[
          "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition",
          active ? "bg-[#F5F3FF] text-[#111827]" : "bg-[#F3F4F6] text-[#111827] hover:bg-[#E5E7EB]",
        ].join(" ")}
      >
        <span className="font-medium">{label}</span>
        <span className="rounded-md bg-white/80 px-2 py-0.5 text-xs text-gray-500">
          {count}
        </span>
      </button>
    );
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="relative rounded-full p-2 hover:bg-gray-100"
        onClick={() => setShowDropdown((p) => !p)}
        aria-label="Notifications"
      >
        <svg className="h-6 w-6 text-[#6D28D9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-white shadow-md">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown &&
        createPortal(
          <div
            ref={dropdownRef}
            className="fixed w-[560px] max-w-[92vw] overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"
            style={{ top: buttonPosition.top, right: buttonPosition.right, zIndex: 99999 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 pt-4">
              <h3 className="text-[18px] font-semibold text-[#111827]">Notification</h3>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  markAllAsRead();
                }}
                disabled={loadingMarkAll || unreadCount === 0}
                className="text-sm font-medium text-[#6D28D9] underline underline-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingMarkAll ? "Marking..." : "Mark All as Read"}
              </button>
            </div>

            <div className="px-5 pb-3 pt-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <TabBtn k="all" label="All" count={counts.all} />
                <TabBtn k="candidate" label="New Candidate" count={counts.candidate} />
                <TabBtn k="offer" label="New Offer" count={counts.offer} />
              </div>
            </div>

            <div className="max-h-[320px] overflow-y-auto pb-2">
              {filteredNotifications.length === 0 ? (
                <div className="px-5 py-10 text-center text-gray-400">No notifications yet.</div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {filteredNotifications.map((notif, idx) => {
                    const { kind, title, name, detail } = parseMessage(notif);
                    const ts = formatDateTime(notif.createdAt);
                    const isUnread = !notif.read;

                    return (
                      <li
                        key={notif._id || idx}
                        className={[
                          "relative flex gap-3 px-5 py-4 transition hover:bg-gray-50",
                          isUnread ? "opacity-100" : "opacity-70",
                        ].join(" ")}
                      >
                        {isUnread && (
                          <span
                            className={[
                              "absolute left-0 top-3 h-[calc(100%-1.5rem)] w-[3px] rounded-r",
                              leftBarColor(kind),
                            ].join(" ")}
                          />
                        )}

                        <KindIcon kind={kind} />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="truncate text-[14px] font-semibold text-[#111827]">
                                {title}
                              </div>

                              {(name || detail) && (
                                <div className="mt-1 text-[12.5px]">
                                  {name ? (
                                    <>
                                      <span className="font-medium text-[#2563EB]">{name}</span>
                                      {detail ? (
                                        <span className="text-gray-500">
                                          {" "}
                                          for{" "}
                                          <span
                                            className={
                                              kind === "offer"
                                                ? "font-medium text-[#EF4444]"
                                                : "text-gray-500"
                                            }
                                          >
                                            {detail}
                                          </span>
                                        </span>
                                      ) : null}
                                    </>
                                  ) : (
                                    <span
                                      className={
                                        kind === "offer"
                                          ? "font-medium text-[#EF4444]"
                                          : "text-gray-500"
                                      }
                                    >
                                      {detail}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="shrink-0 whitespace-nowrap text-[11px] text-gray-400">
                              {ts}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}