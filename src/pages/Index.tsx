import { CalendarCheck, Trophy, Clock, Target } from "lucide-react";
import Header from "@/components/Header";
import StreakCard from "@/components/StreakCard";
import UpcomingEvent from "@/components/UpcomingEvent";
import StatCard from "@/components/StatCard";
import AddEventButton from "@/components/AddEventButton";
import TardyMascot from "@/components/TardyMascot";

const Index = () => {
  // Mock data - would come from backend/state
  const streak = 12;
  const upcomingEvents = [
    {
      id: 1,
      title: "Team Standup",
      time: "9:00 AM",
      location: "Conference Room A",
      minutesUntilLeave: 8,
    },
    {
      id: 2,
      title: "Dentist Appointment",
      time: "2:30 PM",
      location: "Downtown Dental",
      minutesUntilLeave: 45,
    },
    {
      id: 3,
      title: "Gym Class",
      time: "6:00 PM",
      location: "FitLife Center",
      minutesUntilLeave: 180,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 pb-8">
        <Header />

        {/* Hero greeting */}
        <section className="mt-6 text-center">
          <div className="flex justify-center mb-4">
            <TardyMascot size="lg" mood={streak >= 7 ? "celebrating" : "encouraging"} />
          </div>
          <h2 className="text-2xl font-extrabold text-foreground">
            Good morning, Alex! 👋
          </h2>
          <p className="text-muted-foreground mt-1">
            You've got {upcomingEvents.length} events today. Let's stay on time!
          </p>
        </section>

        {/* Streak card */}
        <section className="mt-6">
          <StreakCard streak={streak} />
        </section>

        {/* Upcoming events */}
        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Today's Schedule</h3>
            <span className="text-sm text-muted-foreground">
              {upcomingEvents.length} events
            </span>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <UpcomingEvent
                key={event.id}
                title={event.title}
                time={event.time}
                location={event.location}
                minutesUntilLeave={event.minutesUntilLeave}
              />
            ))}
            <AddEventButton />
          </div>
        </section>

        {/* Stats grid */}
        <section className="mt-8">
          <h3 className="text-lg font-bold text-foreground mb-4">Your Stats</h3>
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              icon={CalendarCheck}
              label="On-time rate"
              value="94%"
              subtext="This month"
              variant="success"
            />
            <StatCard
              icon={Trophy}
              label="Best streak"
              value="21 days"
              subtext="Personal record"
            />
            <StatCard
              icon={Clock}
              label="Avg. early"
              value="4 min"
              subtext="Last 7 days"
              variant="success"
            />
            <StatCard
              icon={Target}
              label="Events tracked"
              value="156"
              subtext="All time"
            />
          </div>
        </section>

        {/* Motivation footer */}
        <section className="mt-8 text-center py-6 px-4 rounded-2xl bg-gradient-hero">
          <p className="text-primary-foreground font-bold text-lg">
            🏃 "Early is on time, on time is late!"
          </p>
          <p className="text-primary-foreground/80 text-sm mt-2">
            Keep building that streak!
          </p>
        </section>
      </div>
    </div>
  );
};

export default Index;
