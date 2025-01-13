import { useEffect, useState } from 'react';

const GenevaPostalCodes = () => {
    useEffect(() => {
        const loadData = async () => {
            try {
                // Import du fichier JSON des codes postaux
                const zipData = await import('../asset/AMTOVZ_ZIP.json');

                // Filtrer et trier les codes postaux
                const filteredZones = zipData.default.features
                    .filter(feature => {
                        const zip = feature.properties.ZIP4;
                        return zip >= "1200" && zip <= "1248";
                    })
                    .map(feature => ({
                        postalCode: feature.properties.ZIP4,
                        name: feature.properties.NAME,
                        geometry: feature.geometry
                    }))
                    .sort((a, b) => a.postalCode.localeCompare(b.postalCode));

                console.log('Codes postaux trouvés :', filteredZones);
                console.log('Nombre total de zones :', filteredZones.length);

                // Log détaillé des zones
                filteredZones.forEach(zone => {
                    console.log(`
Code postal: ${zone.postalCode}
Nom: ${zone.name}
Nombre de points de coordonnées: ${zone.geometry.coordinates[0].length}
-------------------`);
                });

            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            }
        };

        loadData();
    }, []);

    return (
        <div>
            <h2>Codes postaux de Genève (1200-1248)</h2>
            <p>Veuillez consulter la console pour voir les détails des zones</p>
        </div>
    );
};

export default GenevaPostalCodes;
