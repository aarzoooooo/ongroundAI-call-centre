import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCall } from "./components/LiveCall";



const leads = [

  {

    name: "Priya Sharma",

    company: "Acme Retail",

    phone: "+91 98765 43210",

    icp: 92,

    intent: 88,

    signals: ["Recently enquired about a premium plan", "High purchase intent"],

  },

  {

    name: "Rahul Mehta",

    company: "Bright Living",

    phone: "+91 98765 12345",

    icp: 84,

    intent: 76,

    signals: ["Requested a product demo", "Interested in enterprise pricing"],

  },

  {

    name: "Neha Rao",

    company: "Urban Nest",

    phone: "+91 99887 66554",

    icp: 78,

    intent: 65,

    signals: ["Visited the product enquiry page", "Potential interest in a new plan"],

  },

  {

    name: "Suresh Nair",

    company: "Plan Upgrade Co.",

    phone: "+91 98765 11223",

    icp: 74,

    intent: 61,

    signals: ["Asked about plan upgrades", "Follow-up recommended"],

  },

  {

    name: "Priya Iyer",

    company: "Northstar Services",

    phone: "+91 98765 44556",

    icp: 70,

    intent: 58,

    signals: ["Recently contacted the team", "May need additional information"],

  },

];



const initialMessages = {

  "# general": [

    { name: "AvaniBot", text: "Welcome to the team channel! What can I help you with?", time: "10:30 AM" },

    { name: "Arvind", text: "I am ready to get started.", time: "10:31 AM" },

  ],

  "# sales": [

    { name: "AvaniBot", text: "Welcome to the sales channel.", time: "10:32 AM" },

    { name: "Arvind", text: "Let's prioritise our hottest leads today.", time: "10:34 AM" },

  ],

  "# team-updates": [

    { name: "AvaniBot", text: "Welcome to team updates.", time: "10:35 AM" },

    { name: "Arvind", text: "Share your updates with the team here.", time: "10:36 AM" },

  ],

};



const buttonStyle = {

  background: "#078b75",

  color: "white",

  border: "1px solid #078b75",

  padding: "11px 16px",

  borderRadius: 8,

  cursor: "pointer",

  fontSize: 14,

};



const secondaryButton = {

  background: "white",

  color: "#183e36",

  border: "1px solid #d5e0eb",

  padding: "10px 14px",

  borderRadius: 8,

  cursor: "pointer",

  fontSize: 14,

};



const cardStyle = {

  background: "white",

  border: "1px solid #dbe3ef",

  borderRadius: 16,

  padding: 24,

  boxShadow: "0 5px 18px rgba(20, 45, 60, 0.035)",

};



const muted = { color: "#647a9b", fontSize: 14 };



export default function OtherPages({ title = "Plan" }) {

  const navigate = useNavigate();

  const { ring } = useCall();

  const [expandedLead, setExpandedLead] = useState(0);

  const [leadPage, setLeadPage] = useState(0);

  const [leadModal, setLeadModal] = useState(null);

  const [practiceCustomer, setPracticeCustomer] = useState(null);

  const [practiceStarted, setPracticeStarted] = useState(false);

  const [activeChannel, setActiveChannel] = useState("# general");

  const [messages, setMessages] = useState(initialMessages);

  const [messageText, setMessageText] = useState("");

  const [inputAnswer, setInputAnswer] = useState("");

  const [calendarDate, setCalendarDate] = useState(new Date());

  const [signalsOpen, setSignalsOpen] = useState(true);

  const [notice, setNotice] = useState("");



  const normalizedTitle = String(title).toLowerCase();

  const isCalls = normalizedTitle.includes("calls to make");

  const isIncoming = normalizedTitle.includes("incoming");

  const isRecent = normalizedTitle.includes("recent");

  const isCalendar = normalizedTitle.includes("calendar");

  const isPulse = normalizedTitle.includes("pulse");

  const isPracticePage = normalizedTitle.includes("practise") || normalizedTitle.includes("practice");
  const isPlanPage = isCalls || isIncoming || isRecent





  function startPractice(customer) {

    setPracticeCustomer(customer);

    setPracticeStarted(false);

  }



  function showNotice(text) {

    setNotice(text);

    window.setTimeout(() => setNotice(""), 3000);

  }



  function sendMessage(event) {

    event.preventDefault();

    if (!messageText.trim()) return;



    setMessages((previous) => ({

      ...previous,

      [activeChannel]: [

        ...(previous[activeChannel] || []),

        {

          name: "Arvind",

          text: messageText.trim(),

          time: new Date().toLocaleTimeString([], {

            hour: "2-digit",

            minute: "2-digit",

          }),

        },

      ],

    }));



    setMessageText("");

  }



  function changeChannel(channel) {

    setActiveChannel(channel);

    setInputAnswer("");

  }



  function changeMonth(amount) {

    setCalendarDate(

      (previous) =>

        new Date(previous.getFullYear(), previous.getMonth() + amount, 1)

    );

  }



  function goToToday() {

    setCalendarDate(new Date());

  }



  const calendarYear = calendarDate.getFullYear();

  const calendarMonth = calendarDate.getMonth();

  const firstWeekday = new Date(calendarYear, calendarMonth, 1).getDay();

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();



  const events = {

    5: { time: "10:30 AM", text: "Priya Iyer" },

    12: { time: "2:00 PM", text: "Follow-up call" },

    16: { time: "4:30 PM", text: "Customer callback" },

    22: { time: "11:00 AM", text: "Lead review" },

  };



  const channelMessages = messages[activeChannel] || [];



  return (

    <div style={{ color: "#142b27", minWidth: 0, width: "100%" }}>

      <style>{`

        .op-page-heading {

          display: flex;

          justify-content: space-between;

          align-items: center;

          gap: 16px;

          flex-wrap: wrap;

          margin: 0 0 24px;

        }

        .op-page-heading h1 {

          font-size: 26px;

          margin: 0;

          font-weight: 600;

          letter-spacing: -0.7px;

        }

        .op-lead-row {

          display: grid;

          grid-template-columns: 34px minmax(130px, 1fr) 85px 85px 20px;

          gap: 10px;

          align-items: center;

          padding: 17px 14px;

          border: 1px solid #dbe3ef;

          border-radius: 12px;

          cursor: pointer;

        }

        .op-lead-row:hover { background: #f7fafc; }

        .op-calendar-grid {

          display: grid;

          grid-template-columns: repeat(7, minmax(0, 1fr));

          border-top: 1px solid #e0e7ef;

          border-left: 1px solid #e0e7ef;

        }

        .op-calendar-day {

          min-width: 0;

          min-height: 88px;

          padding: 8px;

          border-right: 1px solid #e0e7ef;

          border-bottom: 1px solid #e0e7ef;

          background: white;

          font-size: 13px;

        }

        .op-channel-button {

          border: 1px solid #d5e0eb;

          background: white;

          border-radius: 8px;

          padding: 9px 12px;

          cursor: pointer;

          color: #24413a;

          text-align: left;

        }

        .op-channel-button.active {

          background: #e0f4ed;

          border-color: #0b917a;

          color: #007d69;

          font-weight: 600;

        }

        .op-message {

          padding: 13px 14px;

          background: #f0f3f6;

          border-radius: 12px;

          margin-bottom: 12px;

          max-width: 88%;

          overflow-wrap: anywhere;

        }

        .op-message.mine {

          margin-left: auto;

          background: #e0f4ed;

        }

        .op-modal-backdrop {

          position: fixed;

          inset: 0;

          z-index: 9999;

          background: rgba(8, 30, 28, 0.55);

          backdrop-filter: blur(5px);

          display: flex;

          justify-content: center;

          align-items: center;

          padding: 18px;

          overflow-y: auto;

        }

        .op-modal {

          width: min(480px, 100%);

          max-height: 90vh;

          overflow-y: auto;

          background: white;

          border: 1px solid #e0e6ed;

          border-radius: 16px;

          padding: 26px;

          box-shadow: 0 20px 70px rgba(0,0,0,0.22);

        }

        @media (max-width: 650px) {

          .op-lead-row {

            grid-template-columns: 28px minmax(0, 1fr) 55px 55px 16px;

            gap: 5px;

            padding: 12px 7px;

            font-size: 12px;

          }

          .op-calendar-day {

            min-height: 65px;

            padding: 4px;

            font-size: 11px;

          }

          .op-calendar-event {

            font-size: 10px !important;

            padding: 4px !important;

          }

          .op-pulse-layout {

            grid-template-columns: 1fr !important;

          }

          .op-page-heading h1 { font-size: 23px; }

        }

      `}</style>



      {isPlanPage ? (
  <div className="plan-banner">
    <div>
      <small>Today's calling plan</small>
      <h1>Planner</h1>
    </div>
    <span className="plan-date">
      {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
    </span>
  </div>
) : (
  <div className="op-page-heading">
    <h1>
      {isCalendar ? 'Calendar' : isPulse ? 'Pulse' : isPracticePage ? 'Practise a call' : 'Page not found'}
    </h1>
    <span style={muted}>Manage your calls, leads, and daily activities.</span>
  </div>
)}



      {/* CALLS TO MAKE */}

      {isCalls && (

        <section style={cardStyle}>

          <div

            style={{

              display: "flex",

              justifyContent: "space-between",

              gap: 12,

              flexWrap: "wrap",

              marginBottom: 18,

            }}

          >

            <h2 style={{ fontSize: 18, margin: 0 }}>Recommended leads</h2>

            <span style={muted}>Ranked by lead quality</span>

          </div>



          <div style={{ display: "grid", gap: 10 }}>

            {leads.slice(leadPage > 2 ? 2 : 0, (leadPage > 2 ? 2 : 0) + 3).map((lead, index) => {

              const realIndex = leadPage > 2 ? index + 2 : index;

              return (

                <div key={lead.name}>

                  <div

                    className="op-lead-row"

                    onClick={() =>

                      setExpandedLead(expandedLead === realIndex ? -1 : realIndex)

                    }

                  >

                    <div

                      style={{

                        background: "#e0f4ed",

                        color: "#008d76",

                        width: 30,

                        height: 30,

                        borderRadius: "50%",

                        display: "grid",

                        placeItems: "center",

                        fontWeight: 600,

                      }}

                    >

                      {realIndex + 1}

                    </div>

                    <div style={{ minWidth: 0 }}>

                      <strong>{lead.name}</strong>

                      <div style={{ ...muted, fontSize: 11, marginTop: 8 }}>

                        {lead.company} · {lead.phone}

                      </div>

                    </div>

                    <div style={{ textAlign: "center" }}>

                      <strong style={{ color: "#008b75", fontSize: 17 }}>

                        {lead.icp}

                      </strong>

                      <div style={{ ...muted, fontSize: 11 }}>ICP score</div>

                    </div>

                    <div style={{ textAlign: "center" }}>

                      <strong style={{ color: "#008b75", fontSize: 17 }}>

                        {lead.intent}

                      </strong>

                      <div style={{ ...muted, fontSize: 11 }}>Intent score</div>

                    </div>

                    <span>{expandedLead === realIndex ? "−" : "+"}</span>

                  </div>



                  {expandedLead === realIndex && (

                    <div

                      style={{

                        background: "#f7f9fb",

                        border: "1px solid #dbe3ef",

                        borderTop: 0,

                        borderRadius: "0 0 12px 12px",

                        padding: "18px 24px",

                      }}

                    >

                      <strong>Buying signals</strong>

                      <ul style={{ color: "#566d8d", lineHeight: 1.9 }}>

                        {lead.signals.map((signal) => (

                          <li key={signal}>{signal}</li>

                        ))}

                      </ul>

                      <button

                        style={buttonStyle}

                        onClick={() => { ring({ name: lead.name, line: "calling from +91 98450 xxxxx" }); navigate("/calls-to-make"); }}

                      >

                        Practise a call

                      </button>

                    </div>

                  )}

                </div>

              );

            })}

          </div>



          <div

            style={{

              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",

              gap: 12,

              marginTop: 20,

              flexWrap: "wrap",

            }}

          >

            <span style={muted}>

              Showing {leadPage > 2 ? "3–5" : "1–3"} of {leads.length}

            </span>

            <div style={{ display: "flex", gap: 8 }}>

              <button

                style={secondaryButton}

                disabled={leadPage === 0}

                onClick={() => {

                  setLeadPage(0);

                  setExpandedLead(-1);

                }}

              >

                Previous

              </button>

              <button

                style={secondaryButton}

                disabled={leadPage > 1}

                onClick={() => {

                  setLeadPage(2);

                  setExpandedLead(-1);

                }}

              >

                Next

              </button>

            </div>

          </div>



          <button

            style={{ ...buttonStyle, marginTop: 16 }}

            onClick={() => setLeadModal(0)}

          >

            View lead details

          </button>

        </section>

      )}



      {/* PLAN */}

      {normalizedTitle === "plan" && (

        <section style={cardStyle}>

          <h2 style={{ margin: "0 0 8px", fontSize: 19 }}>Your daily plan</h2>

          <p style={muted}>Manage your callbacks, hot leads and outcomes.</p>



          {[

            ["Callbacks", "Follow up with customers who recently called", "View callbacks", "/incoming"],

            ["Hot leads", "Reach out to customers with strong buying signals", "View hot leads", "/calls-to-make"],

            ["Recent calls", "Review completed customer conversations", "View recent calls", "/recent"],

          ].map(([heading, description, label, href]) => (

            <div

              key={heading}

              style={{

                padding: "20px 0",

                borderBottom: "1px solid #e4ebf2",

              }}

            >

              <strong>{heading}</strong>

              <p style={{ ...muted, margin: "5px 0 12px" }}>{description}</p>

              <a href={href} style={{ textDecoration: "none" }}>

                <button style={buttonStyle}>{label}</button>

              </a>

            </div>

          ))}

        </section>

      )}



      {/* INCOMING */}

      {isIncoming && (

        <section style={cardStyle}>

          <h2 style={{ fontSize: 19, margin: "0 0 8px" }}>Missed calls</h2>

          <p style={muted}>Follow up with customers who recently called.</p>

          {[

            ["Priya Iyer", "Billing enquiry", "High"],

            ["Suresh Nair", "Plan upgrade enquiry", "High"],

            ["Rahul Mehta", "Product question", "Medium"],

          ].map(([name, detail, priority]) => (

            <div

              key={name}

              style={{

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                flexWrap: "wrap",

                gap: 12,

                padding: "18px 0",

                borderBottom: "1px solid #e5ebf1",

              }}

            >

              <div>

                <strong>{name}</strong>

                <p style={{ ...muted, margin: "5px 0" }}>

                  {detail} · {priority} priority

                </p>

              </div>

              <button style={buttonStyle} onClick={() => startPractice(name)}>

                Call back

              </button>

            </div>

          ))}

        </section>

      )}



      {/* RECENT */}

      {isRecent && (

        <section style={cardStyle}>

          <h2 style={{ fontSize: 19, margin: "0 0 8px" }}>Recent calls</h2>

          <p style={muted}>Review completed customer conversations.</p>

          {[

            ["Priya Iyer", "Outgoing call", "4m 12s"],

            ["Suresh Nair", "Incoming call", "2m 45s"],

            ["Rahul Mehta", "Outgoing call", "6m 10s"],

          ].map(([name, type, duration]) => (

            <div

              key={name}

              style={{

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                gap: 12,

                flexWrap: "wrap",

                padding: "18px 0",

                borderBottom: "1px solid #e5ebf1",

              }}

            >

              <div>

                <strong>{name}</strong>

                <p style={{ ...muted, margin: "5px 0" }}>

                  {type} · {duration}

                </p>

              </div>

              <button

                style={secondaryButton}

                onClick={() => setNotice(`Customer: ${name} · Call details: ${type} · ${duration}. Review details are not available in this sample data.`)}

              >

                Review call

              </button>

            </div>

          ))}

        </section>

      )}



      {/* PRACTISE A CALL PAGE */}

      {isPracticePage && (

        <section style={cardStyle}>

          <h2>Practise a conversation</h2>

          <p style={muted}>Choose a customer to begin a practice call.</p>

          {leads.slice(0, 3).map((lead) => (

            <div

              key={lead.name}

              style={{

                padding: "16px 0",

                borderBottom: "1px solid #e4ebf2",

                display: "flex",

                justifyContent: "space-between",

                gap: 12,

                flexWrap: "wrap",

              }}

            >

              <div>

                <strong>{lead.name}</strong>

                <p style={{ ...muted, margin: "5px 0" }}>{lead.company}</p>

              </div>

              <button

                style={buttonStyle}

                onClick={() => { ring({ name: lead.name, line: "calling from +91 98450 xxxxx" }); navigate("/calls-to-make"); }}

              >

                Practise a call

              </button>

            </div>

          ))}

        </section>

      )}



      {/* CALENDAR */}

      {isCalendar && (

        <section style={cardStyle}>

          <div

            style={{

              display: "flex",

              alignItems: "center",

              gap: 10,

              flexWrap: "wrap",

              marginBottom: 10,

            }}

          >

            <button style={secondaryButton} onClick={() => changeMonth(-1)}>

              ←

            </button>

            <h2

              style={{

                fontSize: 20,

                margin: 0,

                minWidth: 170,

              }}

            >

              {calendarDate.toLocaleDateString("en-US", {

                month: "long",

                year: "numeric",

              })}

            </h2>

            <button style={secondaryButton} onClick={goToToday}>

              Today

            </button>

            <button style={secondaryButton} onClick={() => changeMonth(1)}>

              →

            </button>

          </div>



          <p style={{ ...muted, margin: "0 0 20px" }}>

            Upcoming callbacks and scheduled customer calls.

          </p>



          <div className="op-calendar-grid">

            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (

              <div

                key={day}

                style={{

                  fontWeight: 600,

                  background: "#f8fafc",

                  padding: 8,

                  borderRight: "1px solid #e0e7ef",

                  borderBottom: "1px solid #e0e7ef",

                }}

              >

                {day}

              </div>

            ))}



            {Array.from({ length: firstWeekday }, (_, index) => (

              <div className="op-calendar-day" key={`empty-${index}`} style={{ background: "#f8fafc" }} />

            ))}



            {Array.from({ length: daysInMonth }, (_, index) => {

              const day = index + 1;

              const event = events[day];

              const isToday =

                new Date().getFullYear() === calendarYear &&

                new Date().getMonth() === calendarMonth &&

                new Date().getDate() === day;



              return (

                <div className="op-calendar-day" key={day}>

                  <span

                    style={{

                      display: "inline-grid",

                      placeItems: "center",

                      width: 25,

                      height: 25,

                      borderRadius: "50%",

                      background: isToday ? "#078b75" : "transparent",

                      color: isToday ? "white" : "#183e36",

                      fontWeight: isToday ? 700 : 400,

                    }}

                  >

                    {day}

                  </span>

                  {event && (

                    <button

                      className="op-calendar-event"

                      onClick={() => showNotice(`${event.time} · ${event.text}`)}

                      style={{

                        display: "block",

                        width: "100%",

                        marginTop: 8,

                        padding: 7,

                        textAlign: "left",

                        border: 0,

                        borderRadius: 6,

                        background: "#e0f4ed",

                        color: "#24584d",

                        cursor: "pointer",

                        fontSize: 11,

                        overflowWrap: "anywhere",

                      }}

                    >

                      {event.time} · {event.text}

                    </button>

                  )}

                </div>

              );

            })}

          </div>

        </section>

      )}



      {/* PULSE */}

      {isPulse && (

        <div

          className="op-pulse-layout"

          style={{

            display: "grid",

            gridTemplateColumns: "minmax(220px, 0.9fr) minmax(300px, 1.1fr)",

            gap: 18,

            alignItems: "start",

          }}

        >

          <section style={cardStyle}>

            <h2 style={{ fontSize: 20, margin: "0 0 12px" }}>Pulse</h2>

            <p style={muted}>AvaniBot</p>

            <h3 style={{ fontSize: 17, marginTop: 22 }}>Channels</h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>

              {["# general", "# sales", "# team-updates"].map((channel) => (

                <button

                  key={channel}

                  className={`op-channel-button ${activeChannel === channel ? "active" : ""}`}

                  onClick={() => changeChannel(channel)}

                >

                  {channel}

                </button>

              ))}

            </div>

            <h3 style={{ fontSize: 17, marginTop: 28 }}>Kudos</h3>

            <p style={muted}>Celebrate your team's wins.</p>

          </section>



          <section style={{ ...cardStyle, minWidth: 0 }}>

            <h2 style={{ fontSize: 20, margin: "0 0 16px" }}>

              {activeChannel}

            </h2>



            <div

              style={{

                padding: 16,

                background: "#fff9e9",

                border: "1px solid #f2cf7a",

                borderRadius: 12,

                marginBottom: 20,

              }}

            >

              <strong>Needs your input</strong>

              <p style={{ margin: "5px 0 12px", color: "#526b88", lineHeight: 1.5 }}>

                How should we follow up with the new leads?

              </p>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>

                <button

                  style={buttonStyle}

                  onClick={() => {

                    setInputAnswer("Prioritise hot leads");

                    showNotice("Hot leads prioritised!");

                  }}

                >

                  Prioritise hot leads

                </button>

                <button

                  style={buttonStyle}

                  onClick={() => {

                    setInputAnswer("Schedule follow-ups");

                    showNotice("Follow-ups scheduled!");

                  }}

                >

                  Schedule follow-ups

                </button>

              </div>

              {inputAnswer && (

                <p style={{ color: "#087e69", fontSize: 13, marginBottom: 0 }}>

                  Selected: {inputAnswer}

                </p>

              )}

            </div>



            <div style={{ minHeight: 180 }}>

              {channelMessages.map((message, index) => (

                <div

                  className={`op-message ${message.name === "Arvind" ? "mine" : ""}`}

                  key={`${message.time}-${index}`}

                >

                  <strong style={{ display: "block", marginBottom: 7 }}>

                    {message.name}

                  </strong>

                  <div style={{ lineHeight: 1.5 }}>{message.text}</div>

                  <small style={{ display: "block", marginTop: 6, color: "#647a9b" }}>

                    {message.time}

                  </small>

                </div>

              ))}

            </div>



            <form

              onSubmit={sendMessage}

              style={{

                display: "flex",

                gap: 8,

                marginTop: 18,

                borderTop: "1px solid #e4ebf2",

                paddingTop: 16,

              }}

            >

              <input

                value={messageText}

                onChange={(event) => setMessageText(event.target.value)}

                placeholder={`Message ${activeChannel}...`}

                aria-label="Write a message"

                style={{

                  flex: 1,

                  minWidth: 0,

                  border: "1px solid #d5e0eb",

                  borderRadius: 8,

                  padding: "12px",

                  outlineColor: "#078b75",

                }}

              />

              <button style={buttonStyle} type="submit">

                Send

              </button>

            </form>

          </section>

        </div>

      )}



      {/* LEAD DETAILS MODAL */}

      {leadModal !== null && (

        <div

          className="op-modal-backdrop"

          onClick={() => setLeadModal(null)}

        >

          <div className="op-modal" onClick={(event) => event.stopPropagation()}>

            <div

              style={{

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                gap: 12,

              }}

            >

              <span style={muted}>Lead {leadModal + 1} of {leads.length}</span>

              <button

                aria-label="Close lead details"

                style={secondaryButton}

                onClick={() => setLeadModal(null)}

              >

                ✕

              </button>

            </div>



            <h2 style={{ margin: "12px 0" }}>{leads[leadModal].name}</h2>

            <p style={muted}>

              {leads[leadModal].company} · {leads[leadModal].phone}

            </p>



            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "22px 0 30px" }}>

              {[

                ["ICP score", leads[leadModal].icp],

                ["Intent score", leads[leadModal].intent],

              ].map(([label, score]) => (

                <div

                  key={label}

                  style={{

                    background: "#e0f4ed",

                    borderRadius: 12,

                    padding: 15,

                    textAlign: "center",

                  }}

                >

                  <strong style={{ display: "block", color: "#008b75", fontSize: 24 }}>

                    {score}

                  </strong>

                  <span style={muted}>{label}</span>

                </div>

              ))}

            </div>



            <button

              style={{ ...buttonStyle, width: "100%", textAlign: "left", fontWeight: 600 }}

              onClick={() => setSignalsOpen(!signalsOpen)}

            >

              Buying signals {signalsOpen ? "−" : "+"}

            </button>



            {signalsOpen && (

              <ul style={{ color: "#566d8d", lineHeight: 1.9, paddingLeft: 22 }}>

                {leads[leadModal].signals.map((signal) => (

                  <li key={signal}>{signal}</li>

                ))}

              </ul>

            )}



            <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 28 }}>

              <button

                style={secondaryButton}

                disabled={leadModal === 0}

                onClick={() => setLeadModal((index) => Math.max(0, index - 1))}

              >

                ← Previous

              </button>

              <button

                style={secondaryButton}

                disabled={leadModal === leads.length - 1}

                onClick={() => setLeadModal((index) => Math.min(leads.length - 1, index + 1))}

              >

                Next →

              </button>

            </div>

            <button

              style={{ ...buttonStyle, marginTop: 12 }}

              onClick={() => setLeadModal(null)}

            >

              Close

            </button>

          </div>

        </div>

      )}



      {/* PRACTICE CALL MODAL */}

      {practiceCustomer && (

        <div

          className="op-modal-backdrop"

          onClick={() => {

            setPracticeCustomer(null);

            setPracticeStarted(false);

          }}

        >

          <div className="op-modal" onClick={(event) => event.stopPropagation()}>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>

              <h2 style={{ fontSize: 20, margin: "0 0 14px" }}>Practise a call</h2>

              <button

                aria-label="Close practice call"

                style={secondaryButton}

                onClick={() => {

                  setPracticeCustomer(null);

                  setPracticeStarted(false);

                }}

              >

                ✕

              </button>

            </div>



            <p style={muted}>

              Customer: <strong>{practiceCustomer}</strong>

            </p>

            <p style={{ color: "#647a9b", lineHeight: 1.7 }}>

              {practiceStarted

                ? "Practice call started. Introduce yourself and ask how you can help."

                : "Ready to practise a conversation with this customer?"}

            </p>



            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>

              <button

                style={buttonStyle}

                onClick={() => {

                  if (!practiceStarted) {

                    setPracticeStarted(true);

                  } else {

                    showNotice("Practice call is in progress.");

                  }

                }}

              >

                {practiceStarted ? "Call in progress" : "Start practice call"}

              </button>

              <button

                style={secondaryButton}

                onClick={() => {

                  setPracticeCustomer(null);

                  setPracticeStarted(false);

                }}

              >

                Close

              </button>

            </div>

          </div>

        </div>

      )}



      {notice && (

        <div

          role="status"

          style={{

            position: "fixed",
            top: 120,
            right: 24,
            bottom: "auto",

            zIndex: 10001,

            background: "#103f34",

            color: "white",

            padding: "14px 18px",

            borderRadius: 10,

            maxWidth: "min(420px, calc(100vw - 48px))",

            boxShadow: "0 8px 28px rgba(0,0,0,.2)",

          }}

        >

          {notice}

          <button

            onClick={() => setNotice("")}

            style={{

              background: "transparent",

              color: "white",

              border: 0,

              cursor: "pointer",

              marginLeft: 12,

            }}

          >

            ✕

          </button>

        </div>

      )}

    </div>

  );

}