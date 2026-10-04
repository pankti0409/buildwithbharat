import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Complaint, GPSLocation } from '../../types';
import { StatusChip } from './StatusChip';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from './Button';

// Fix default leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom pastel icon factory
const createCustomPin = (status: string) => {
  let color = '#8B7CF6';
  if (status === 'PENDING') color = '#FFE29A';
  if (status === 'IN_PROGRESS') color = '#9CCBFF';
  if (status === 'RESOLVED') color = '#7ED9B8';
  if (status === 'VERIFIED') color = '#8B7CF6';
  if (status === 'REOPENED') color = '#F7A1B5';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        width: 34px;
        height: 34px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2.5px solid #FFFFFF;
        box-shadow: 0 4px 14px rgba(0,0,0,0.25);
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: #FFFFFF;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -32],
  });
};

interface MapComponentProps {
  complaints: Complaint[];
  center?: [number, number];
  zoom?: number;
  selectedComplaintId?: string;
  onSelectComplaint?: (complaint: Complaint) => void;
  radiusCircleMeters?: number;
  userLocation?: GPSLocation;
  className?: string;
}

// Map center adjuster component
const MapCenterController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
};

export const MapComponent: React.FC<MapComponentProps> = ({
  complaints,
  center = [23.0378, 72.5621], // Ahmedabad default
  zoom = 13,
  selectedComplaintId,
  onSelectComplaint,
  radiusCircleMeters,
  userLocation,
  className = 'h-[500px]',
}) => {
  return (
    <div className={`relative w-full rounded-3xl overflow-hidden border border-ink-border shadow-soft ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapCenterController center={center} zoom={zoom} />

        {/* Clean OpenStreetMap CartoDB Positron style */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Optional User Location with Radius Circle */}
        {userLocation && (
          <>
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={L.divIcon({
                className: 'user-pin',
                html: `<div style="width: 18px; height: 18px; background: #8B7CF6; border: 3px solid #FFFFFF; border-radius: 50%; box-shadow: 0 0 12px #8B7CF6;"></div>`,
                iconSize: [18, 18],
                iconAnchor: [9, 9],
              })}
            >
              <Popup>
                <div className="text-xs font-bold p-1">Your Current Location</div>
              </Popup>
            </Marker>

            {radiusCircleMeters && (
              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={radiusCircleMeters}
                pathOptions={{
                  color: '#8B7CF6',
                  fillColor: '#8B7CF6',
                  fillOpacity: 0.08,
                  weight: 1.5,
                  dashArray: '4, 8',
                }}
              />
            )}
          </>
        )}

        {/* Complaint Markers */}
        {complaints.map((c) => (
          <Marker
            key={c.id}
            position={[c.complaintLocation.lat, c.complaintLocation.lng]}
            icon={createCustomPin(c.status)}
            eventHandlers={{
              click: () => onSelectComplaint && onSelectComplaint(c),
            }}
          >
            <Popup>
              <div className="p-1 max-w-[240px]">
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <StatusChip status={c.status} size="sm" />
                  <span className="text-[10px] font-mono text-ink-muted">{c.ticketNumber}</span>
                </div>
                <h4 className="font-bold text-xs text-ink line-clamp-2">{c.title}</h4>
                <p className="text-[11px] text-ink-secondary mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-lavender shrink-0" />
                  <span className="truncate">{c.complaintLocation.address}</span>
                </p>
                {c.photoBeforeUrl && (
                  <img
                    src={c.photoBeforeUrl}
                    alt={c.title}
                    className="w-full h-24 object-cover rounded-xl mt-2 border border-ink-border"
                  />
                )}
                {onSelectComplaint && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onSelectComplaint(c)}
                    className="w-full mt-2.5 text-xs h-8"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    View Grievance
                  </Button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
