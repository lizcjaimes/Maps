import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

const { width } = Dimensions.get('window');

type PuebloMagico = {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  coordenadas: {
    latitude: number;
    longitude: number;
  };
};

export default function Index() {
  const mapRef = useRef<MapView | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const utCancunCordenadas = {
    latitude: 21.049706945065065,
    longitude: -86.84696671534338,
  };

  const [region, setRegion] = useState<Region>({
    ...utCancunCordenadas,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const pueblosMagicos: PuebloMagico[] = [
    {
      id: '1',
      nombre: 'Valladolid',
      descripcion: 'Ciudad colonial con cenotes y arquitectura histórica',
      imagen:
        'https://upload.wikimedia.org/wikipedia/commons/6/63/Valladolid_iglesia_2.jpg',
      coordenadas: { latitude: 20.6896, longitude: -88.2011 },
    },
    {
      id: '2',
      nombre: 'Tizimín',
      descripcion: 'Cuna de la vaquería Yucateca y la feria de reyes',
      imagen:
        'https://pptotravel.com/wp-content/uploads/2015/01/tizimin-pptotravel-yucatc3a1n-iglesia.jpg?w=1200',
      coordenadas: { latitude: 21.14532149144678, longitude: -88.15084455922981 },
    },
    {
      id: '3',
      nombre: 'Izamal',
      descripcion:
        'Conocida como "La ciudad amarilla", rica en historia maya y colonial.',
      imagen:
        'https://yucatantoday.com/hubfs/Izamal-Convento-San-Bernardino-de-Siena-by-Yucatan-Today.webp',
      coordenadas: { latitude: 20.933, longitude: -89.017 },
    },
    {
      id: '4',
      nombre: 'Maní',
      descripcion: 'Lugar lleno de cultura y gastronomía tradicional',
      imagen:
        'https://upload.wikimedia.org/wikipedia/commons/e/e3/2002.12.30_24_Church_Man%C3%AD_Yucatan_Mexico.jpg',
      coordenadas: { latitude: 20.39294, longitude: -89.39219 },
    },
    {
      id: '5',
      nombre: 'Tekax',
      descripcion: 'Grutas, aventuras y vistas desde lo alto de Yucatán',
      imagen:
        'https://yucatan.travel/wp-content/uploads/2024/05/Tekax-Yucata%CC%81n-PM.jpg',
      coordenadas: { latitude: 20.21227, longitude: -89.27622 },
    },
    {
      id: 'ut',
      nombre: 'UT Cancún',
      descripcion: 'Volver a UT',
      imagen:
        'https://lh3.googleusercontent.com/proxy/JKbGe63Uj2PBTWvfOirZqNGhbjbqG6VBshlujpjgsD8lIJVfc2QgN2oQOq3yLOarX3GGUUrSmotChHGKV_qZM3dcozyprjb74YM43yQ8B2aXhqxHU3Hm21J8CpI8vZGRtae8DqcPow',
      coordenadas: utCancunCordenadas,
    },
  ];

  const moverMapa = (pueblo: PuebloMagico) => {
    setActiveId(pueblo.id);
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...pueblo.coordenadas,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
        1000
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView ref={mapRef} style={styles.mapa} initialRegion={region}>
        <Marker
          coordinate={utCancunCordenadas}
          title="UT Cancún"
          description="Universidad Tecnológica de Cancún"
        />
        {pueblosMagicos.map((pueblo) => (
          <Marker
            key={pueblo.id}
            coordinate={pueblo.coordenadas}
            title={pueblo.nombre}
            description={pueblo.descripcion}
          />
        ))}
      </MapView>

      <View style={styles.listaContainer}>
        <FlatList
          data={pueblosMagicos}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item }) => {
            const activo = item.id === activeId;
            return (
              <View style={[styles.card, activo && styles.cardActivo]}>
                <Image source={{ uri: item.imagen }} style={styles.imagen} />
                <Text style={styles.titulo}>{item.nombre}</Text>
                <Text style={styles.descripcion}>{item.descripcion}</Text>
                <TouchableOpacity
                  style={styles.boton}
                  onPress={() => moverMapa(item)}
                >
                  <Text style={styles.botonTexto}>Ver en mapa</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapa: {
    flex: 1,
  },
  listaContainer: {
    position: 'absolute',
    bottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 10,
    marginHorizontal: 6,
    width: width * 0.65,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    opacity: 0.9,
  },
  cardActivo: {
    borderColor: '#007bff',
    borderWidth: 2,
    opacity: 1,
  },
  imagen: {
    width: '100%',
    height: 110,
    borderRadius: 10,
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 4,
  },
  descripcion: {
    fontSize: 12,
    color: '#555',
    marginBottom: 8,
  },
  boton: {
    backgroundColor: '#007bff',
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    color: 'white',
    fontWeight: '600',
  },
});
