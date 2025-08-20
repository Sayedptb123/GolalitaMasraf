import React, { useEffect, useMemo, useRef, useState } from "react";
import Map from "./Map";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import useMerchants from "./hooks/useMerchants";
import MainLayout from "../../components/MainLayout";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import MyLocationBtn from "./components/MyLocationBtn";
import FiltersModal from "./components/FiltersModal";
import MapLoader from "./components/MapLoader";
import MerchantModal from "./components/MerchantModal";

const MapPage = () => {
  const { t } = useTranslation();
  const mapRef = useRef();
  const [filters, setFilters] = useState({});

  const { isLoading, isError, data, error } = useMerchants(
    filters?.location?.latitude,
    filters?.location?.longitude
  );
  const [selectedMerchant, setSelectedMerchant] = useState(null);

  const moveMapToPosition = (latitude, longitude) => {
    setFilters({
      location: {
        latitude,
        longitude,
      },
    });

    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    });
  };

  const handleMarkerPress = (e) => {
    const merchantId = e.nativeEvent.id;

    const newSelectedMerchant = data.find(
      (item) => +item.merchant_id === +merchantId
    );

    if (+merchantId !== +selectedMerchant?.merchant_id) {
      setSelectedMerchant(newSelectedMerchant);
    }
  };

  const moveMapToMerchant = () => {
    const searchedMerchant = data.find(
      (item) => item.merchant_name === filters.merchant
    );

    if (searchedMerchant) {
      const latitude = searchedMerchant.partner_latitude;
      const longitude = searchedMerchant.partner_longitude;

      if (latitude && longitude) {
        mapRef.current?.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        });

        setSelectedMerchant(searchedMerchant);
      }
    }
  };

  const mooveMapToLocation = (latitude, longitude) => {
    mapRef.current?.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
  };

  useEffect(() => {
    if (filters?.merchant) {
      moveMapToMerchant();

      return;
    }

    if (filters?.location) {
      const { latitude, longitude } = filters.location;
      mooveMapToLocation(latitude, longitude);
    }
  }, [data?.length, filters?.merchant, filters?.location?.id]);

  const merchats = isLoading ? [] : data;

  return (
    <MainLayout
      outsideScroll={true}
      headerChildren={<Header label={t("Drawer.map")} btns={["back"]} />}
      headerHeight={50}
      contentStyle={{ height: SCREEN_HEIGHT - 120 }}
    >
      {isLoading && <MapLoader />}

      <Map
        merchants={merchats}
        mapRef={mapRef}
        onMarkerPress={handleMarkerPress}
      />

      <MyLocationBtn moveMapToPosition={moveMapToPosition} />

      <FiltersModal onGetFilters={setFilters} filters={filters} />

      <MerchantModal
        merchant={selectedMerchant}
        setSelectedMerchant={setSelectedMerchant}
      />
    </MainLayout>
  );
};

export default MapPage;
