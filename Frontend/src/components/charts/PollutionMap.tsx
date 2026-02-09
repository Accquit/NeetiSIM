import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

// Fix for Leaflet default icon not found in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Delhi Coordinates
const CENTER = [28.6139, 77.2090];
const LOCATIONS = [
    { name: "Anand Vihar", coords: [28.6469, 77.3160], baseAqi: 450 }, // High
    { name: "R.K. Puram", coords: [28.5660, 77.1767], baseAqi: 240 }, // Below Avg
    { name: "Punjabi Bagh", coords: [28.6617, 77.1235], baseAqi: 360 }, // High
    { name: "ITO", coords: [28.6284, 77.2410], baseAqi: 310 }, // Moderate-High
    { name: "Dwarka", coords: [28.5921, 77.0460], baseAqi: 180 }, // Low (Best)
];

// Component to update map view if needed (optional)
function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
}

export default function PollutionMap({ aqi }: { aqi: number }) {
    // Determine color based on AQI
    const getColor = (localAqi: number) => {
        if (localAqi <= 50) return '#10B981'; // Good (Green)
        if (localAqi <= 100) return '#84CC16'; // Satisfactory (Light Green)
        if (localAqi <= 200) return '#FACC15'; // Moderate (Yellow)
        if (localAqi <= 300) return '#F97316'; // Poor (Orange)
        if (localAqi <= 400) return '#EF4444'; // Very Poor (Red)
        return '#7f1d1d'; // Severe (Dark Red)
    };

    // Calculate current local AQI based on global simulation reduction
    // Assuming 'aqi' prop is the current global average.
    // We scale local values proportionally.
    // Base global average is ~287.
    const GLOBAL_BASE = 287;
    const ratio = aqi / GLOBAL_BASE;

    return (
        <div className="h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative z-0">
            <MapContainer
                center={CENTER as [number, number]}
                zoom={11}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {LOCATIONS.map((loc, idx) => {
                    const currentLocalAqi = Math.round(loc.baseAqi * ratio);
                    const color = getColor(currentLocalAqi);

                    return (
                        <CircleMarker
                            key={idx}
                            center={loc.coords as [number, number]}
                            pathOptions={{ fillColor: color, color: color, fillOpacity: 0.6, weight: 15, opacity: 0.2 }}
                            radius={20}
                        >
                            <Popup className="glass-popup">
                                <div className="text-slate-900 font-sans">
                                    <strong className="block text-sm mb-1">{loc.name}</strong>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">AQI</span>
                                        <span className="text-lg font-bold" style={{ color: color }}>{currentLocalAqi}</span>
                                    </div>
                                </div>
                            </Popup>
                        </CircleMarker>
                    );
                })}
                <MapUpdater center={CENTER as [number, number]} />
            </MapContainer>

            {/* Legend Overlay */}
            <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-white/10 z-[1000]">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-2 font-bold">AQI Intensity</div>
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                        <span className="text-xs text-slate-300">Good (0-50)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#FACC15]"></div>
                        <span className="text-xs text-slate-300">Moderate (101-200)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                        <span className="text-xs text-slate-300">Very Poor (301-400)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#7f1d1d]"></div>
                        <span className="text-xs text-slate-300">Severe (401+)</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
