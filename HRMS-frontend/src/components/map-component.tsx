'use client';

import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet/dist/leaflet.css';
import { useEffect, useEffectEvent, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { toast } from 'sonner';

export type TLocation = {
  lat: number;
  lng: number;
};
export interface SearchResult {
  x: number; // longitude
  y: number; // latitude
  label: string;
  bounds: L.LatLngBounds;
  raw?: unknown;
}

// Extend Leaflet event with location
interface GeoSearchShowLocationEvent extends L.LeafletEvent {
  location: SearchResult;
}

function RecenterOnFirstLoad({ position }: { position: TLocation | null }) {
  const map = useMap();
  const [hasCentered, setHasCentered] = useState(false);

  const setHasCenteredEffectEvent = useEffectEvent((value: boolean) => setHasCentered(value));

  useEffect(() => {
    if (position && !hasCentered) {
      map.setView([position.lat, position.lng], 14, { animate: true });
      setHasCenteredEffectEvent(true); // ✅ only center once (on first load)
    }
  }, [position, map, hasCentered]);

  return null;
}

function SearchControl({ onChange }: { onChange: (location: TLocation) => void }) {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = GeoSearchControl({
      provider: provider,
      style: 'bar',
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on('geosearch/showlocation', (_event: unknown) => {
      const event = _event as GeoSearchShowLocationEvent;
      const { x: lng, y: lat } = event.location;
      onChange({
        lat,
        lng,
      });
    });

    return () => {
      map.removeControl(searchControl);
      map.off('geosearch/showlocation');
    };
  }, [map]);

  return null;
}

function SetCurrentLocationControl({ onChange }: { onChange: (location: TLocation) => void }) {
  const map = useMap();

  const setCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;

        onChange({
          lat: latitude,
          lng: longitude,
        });
        map.flyTo([latitude, longitude], 15);
      },
      err => {
        switch (err.code) {
          case err.PERMISSION_DENIED: // PERMISSION_DENIED
            toast.error(
              'Current Location access permission denied. Please allow access to get current location.'
            );
            return;
          case err.POSITION_UNAVAILABLE: // POSITION_UNAVAILABLE
            toast.error("Location unavailable: Your device's location could not be determined.");
            return;
          case err.TIMEOUT: // TIMEOUT
            toast.error(
              'Request timed out: Unable to retrieve your location in time. Please try again.'
            );
            return;
          default:
            toast.error('An unknown geolocation error occurred.');
        }
      }
    );
  };

  useEffect(() => {
    const control = new L.Control({ position: 'topleft' });

    control.onAdd = () => {
      const btn = L.DomUtil.create('button', 'leaflet-bar');
      btn.innerText = '📍';
      btn.style.background = 'white';
      btn.type = 'button';
      btn.style.width = '30px';
      btn.style.height = '30px';
      btn.style.cursor = 'pointer';

      btn.onclick = e => {
        e.stopPropagation();
        setCurrentLocation();
      };

      return btn;
    };

    control.addTo(map);

    return () => {
      control.remove();
    };
  }, [map]);

  return null;
}

export const Map = ({
  position,
  onChange,
}: {
  position: TLocation;
  onChange: (location: TLocation) => void;
}) => {
  const LocationMarker = () => {
    useMapEvents({
      click: async e => {
        const { lat, lng } = e.latlng;

        // setPosition([lat, lng]);
        onChange({
          lat,
          lng,
        });
      },
    });

    if (!position) return null;

    return (
      <Marker
        position={position}
        icon={L.icon({
          iconUrl: '/map/marker-icon.png',
          shadowUrl: '/map/marker-shadow.png',
          iconSize: [28, 46],
          iconAnchor: [17, 46],
        })}
      />
    );
  };

  return (
    <MapContainer
      center={position || [20, 77]} // default India center
      zoom={5}
      style={{ height: '400px', width: '100%' }}
      attributionControl={false}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <RecenterOnFirstLoad position={position} />
      {/* ✅ only on first geolocation */}
      <LocationMarker />
      <SearchControl onChange={onChange} />
      <SetCurrentLocationControl onChange={onChange} />
    </MapContainer>
  );
};
