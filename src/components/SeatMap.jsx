import React, { useMemo } from 'react';

const SeatMap = ({ selectedSeats, onSeatToggle, movieBookedSeats = [], maxSeats = 10 }) => {
  const { rows, seatsPerRow } = useMemo(() => {
    return { rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], seatsPerRow: 12 };
  }, []);

  // Convert array to sets for O(1) lookup
  const bookedSet = useMemo(() => new Set(movieBookedSeats), [movieBookedSeats]);

  const handleSeatClick = (seatId) => {
    if (bookedSet.has(seatId)) return;

    if (selectedSeats.includes(seatId)) {
      onSeatToggle(selectedSeats.filter((s) => s !== seatId));
    } else if (selectedSeats.length < maxSeats) {
      onSeatToggle([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="seat-page-wrap" id="seat-map" style={{ padding: '10px 0', background: 'transparent' }}>
      <div className="seat-grid">
        <div style={{ width: '100%', marginBottom: '24px' }}>
          <div className="screen-bar" />
          <div className="screen-text">SCREEN THIS WAY</div>
        </div>

        {rows.map((row) => (
          <div key={row} className="seat-row-wrap">
            <span className="seat-row-id">{row}</span>
            {Array.from({ length: seatsPerRow }, (_, i) => {
              const seatNum = i + 1;
              const seatId = `${row}${seatNum}`;
              const isBooked = bookedSet.has(seatId);
              const isSelected = selectedSeats.includes(seatId);

              return (
                <React.Fragment key={seatId}>
                  {(seatNum === 5 || seatNum === 9) && <div className="seat-aisle" />}
                  <button
                    className={`seat ${isSelected ? 'seat-selected' : ''} ${isBooked ? 'seat-booked' : ''}`}
                    onClick={() => handleSeatClick(seatId)}
                    disabled={isBooked}
                    title={isBooked ? 'Booked' : isSelected ? 'Selected' : `Seat ${seatId}`}
                  >
                    {seatNum}
                  </button>
                </React.Fragment>
              );
            })}
            <span className="seat-row-id">{row}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
