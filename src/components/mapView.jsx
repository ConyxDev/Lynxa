import { GoogleMap, Circle, OverlayView} from "@react-google-maps/api";
import { useState, useMemo } from "react";
import markerIcon from "../icones/markerGoogle.svg";
import React from "react";

const MapComponent = () => {
    const [hoveredCircle, setHoveredCircle] = useState(null);
    const [defaultRadius] = useState(2000);

    const zone = [
        { id: 6, lat: 46.2333, lng: 6.1167, postalCode: "1218" }, // Grand-Saconnex
        { id: 7, lat: 46.166800, lng: 6.185350, postalCode: "1255" }, // Veyrier
        { id: 8, lat: 46.1892, lng: 6.1283, postalCode: "1212" }, // Lancy
    ];

    const center = useMemo(() => ({
        lat: 46.2044,
        lng: 6.1432,
    }), []);

    const mapContainerStyle = useMemo(() => ({
        width: "100%",
        height: "100%"
    }), []);



    return (
        <div className="googleMap w-full h-[735px]">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
                {zone.map((zone) => {
                    // Générer des options dynamiques pour chaque cercle
                    const circleOptions = {
                        strokeColor: hoveredCircle === zone.id ? "#FF6600" : "#0099cc",
                        strokeOpacity: 1,
                        strokeWeight: hoveredCircle === zone.id ? 2 : 1,
                        fillColor: hoveredCircle === zone.id
                            ? "rgba(255, 102, 0, 0.5)"
                            : "rgba(0, 153, 204, 0.35)",
                        fillOpacity: 0.35,
                    };

                    return (
                        <React.Fragment key={`fragment-${zone.id}`}>
                            <Circle
                                key={zone.id}
                                center={{ lat: zone.lat, lng: zone.lng }}
                                radius={defaultRadius}
                                options={circleOptions}
                                onMouseOver={() => setHoveredCircle(zone.id)}
                                onMouseOut={() => setHoveredCircle(null)}
                            />
                            <OverlayView
                                key={`overlay-${zone.id}`}
                                position={{ lat: zone.lat, lng: zone.lng }}
                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        transform: "translate(-50%, -110%)", // Centre le marqueur
                                    }}
                                >
                                    <img
                                        src={markerIcon}
                                        alt="Marker Icon"
                                        style={{
                                            width: "40px", // Taille du marqueur
                                            height: "40px",
                                        }}
                                    />
                                </div>
                            </OverlayView>
                        </React.Fragment>
                    );
                })}
            </GoogleMap>
        </div>
    );
};

export default MapComponent;


