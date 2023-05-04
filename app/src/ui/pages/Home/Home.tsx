import { x } from '@xstyled/styled-components'
import React, { useMemo} from 'react';

export const Home = () : JSX.Element => {
  const ressourceId = '1337'; // Harcoded for now
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState('12:00');
  const [isAvailable, setIsAvailable] = React.useState<boolean | null>(null);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const formatDate = new Date(
        `${selectedDate.toISOString().substr(0, 10)}T${selectedTime}Z`
        ).toISOString().slice(0, -8) + 'Z';
      const url = `http://localhost:8080/resource/${ressourceId}/available?datetime=${formatDate}`;

      fetch(url, {
          method : "GET",
      })
        .then(async (res) => {
          const json = await res.json();
          setIsAvailable(json.available);
        })
        .catch((err) => { console.error(err); });
    } catch (error) {
      console.error(error);
    }
  };

  const timesOptions: string[] = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const times: string[] = [];
    for (let d = new Date(start); d <= end; d.setMinutes(d.getMinutes() + 30)) {
      times.push(
        d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      );
    }
    return times;
  }, []);

  const StatusMessage = () => {
    if (isAvailable === null) return (<p>Check now for a reservation</p>);
    if (!isAvailable) {
      return (<p>The reservation is not available for {selectedDate.toLocaleDateString('fr-FR')} at {selectedTime}  </p>);
    }
    return (<p>The reservation is available on {selectedDate.toLocaleDateString('fr-FR')} at {selectedTime}</p>);
  }

  return (
    <>
      <h1>Affluences</h1>
      <h2>Check if the ressource is available</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="time">
            Choose a time:
          </label>
          <select
            id="time"
            value={selectedTime}
            onChange={(e) => {
              setIsAvailable(null);
              setSelectedTime(e.target.value);
            }}
          >
            {timesOptions.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date">Choose a date:</label>
          <input
            name="date"
            type="date"
            value={selectedDate.toISOString().substr(0, 10)}
            onChange={(e) => {
              setIsAvailable(null);
              setSelectedDate(new Date(e.target.value));
            }}
            />
        </div>
        <x.button bg="blue-500" type="submit">Submit</x.button>
      </form>
      <StatusMessage />
    </>
  )
}
