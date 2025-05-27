import type { Location } from '@/Types/database.types';

interface LocationSelectorProps {
  locations: Location[];
  selectedLocation?: Location;
  onLocationChange: (location: Location) => void;
}

export function LocationSelector({ locations, selectedLocation, onLocationChange }: LocationSelectorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const location = locations.find((l) => l.location_id === e.target.value);
    if (location) {
      onLocationChange(location);
    }
  };

  return (
    <div className="flex gap-2">
      <label>Location</label>
      <select
        name="locations"
        className="px-3"
        value={selectedLocation?.location_id || ""}
        onChange={handleChange}
      >
        <option value="">Select a location</option>
        {locations.map((location) => (
          <option key={location.location_id} value={location.location_id}>
            {location.location_code}
          </option>
        ))}
      </select>
    </div>
  );
}