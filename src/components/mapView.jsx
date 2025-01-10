import { GoogleMap, Circle, OverlayView} from "@react-google-maps/api";
import { useState, useMemo } from "react";
import markerIcon from "../icones/markerGoogle.svg";
import React from "react";


const MapComponent = () => {
    const [hoveredCircle, setHoveredCircle] = useState(null);
    const [defaultRadius] = useState(2000);

    const zone = [
        { id: 6, lat: 46.2333, lng: 6.1167, postalCode: "1218", available: 10 }, // Grand-Saconnex
        { id: 7, lat: 46.166800, lng: 6.185350, postalCode: "1255", available: 10 }, // Veyrier
        { id: 8, lat: 46.1892, lng: 6.1283, postalCode: "1212", available: 10 }, // Lancy
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
                        strokeColor: hoveredCircle === zone.id ? "#8C87F9" : "#0099cc",
                        strokeOpacity: 1,
                        strokeWeight: hoveredCircle === zone.id ? 2 : 1,
                        fillColor: hoveredCircle === zone.id
                            ? "rgba(140, 135, 249, 1)"
                            : "rgba(0, 153, 204, 0.35)",
                        fillOpacity: 0.35,
                    };

                    return (
                        <React.Fragment key={`fragment-${zone.id}`}>
                            {/* Cercle */}
                            <Circle
                                center={{ lat: zone.lat, lng: zone.lng }}
                                radius={defaultRadius}
                                options={circleOptions}
                                onMouseOver={() => setHoveredCircle(zone.id)}
                                onMouseOut={() => setHoveredCircle(null)}
                            />

                            {/* Overlay avec marqueur SVG et carré */}
                            <OverlayView
                                key={`overlay-${zone.id}`}
                                position={{ lat: zone.lat, lng: zone.lng }}
                                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        transform: "translate(-50%, -50%)",
                                    }}
                                >
                                    {/* Marqueur SVG */}
                                    <img
                                        src={markerIcon}
                                        alt="Marker Icon"
                                        style={{
                                            width: "40px", // Taille du marqueur
                                            height: "40px",
                                            marginBottom: "1px", // Espacement avec le carré
                                        }}
                                    />

                                    {/* Carré avec le nombre */}
                                    <div
                                        style={{
                                            backgroundColor: "#ffffff",
                                            border: "2px solid #0099cc",
                                            borderRadius: "25px",
                                            padding: "5px 10px",
                                            fontSize: "16px",
                                            fontWeight: "bold",
                                            color: zone.available > 0 ? "#0099cc" : "#FF0000",
                                            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.3)",
                                            textAlign: "center",
                                        }}
                                    >
                                        {zone.available > 0 ? zone.available : "X"}
                                    </div>
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

