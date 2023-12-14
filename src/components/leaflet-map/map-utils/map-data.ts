import {BriefOffer} from '../../../types/brief-offer.ts';
import {City} from '../../../types/city.ts';
import {MapPoint} from '../../../types/map-point.ts';

function createMapPoint(entity: BriefOffer | City): MapPoint {
  return {
    id: 'id' in entity ? entity.id : '',
    lat: entity.location.latitude,
    lng: entity.location.longitude,
    zoom: entity.location.zoom
  };
}

function getMapDataFromOffers(
  offers: BriefOffer[],
  selectedCity: City,
  selectedOfferId: BriefOffer['id']): [MapPoint, MapPoint[], MapPoint | undefined] {

  const mapPoints: MapPoint[] = offers.map(createMapPoint);
  const mapCity: MapPoint = createMapPoint(selectedCity);
  const selectedOffer = offers.find((offer) => offer.id === selectedOfferId);
  const selectedMapPoint: MapPoint | undefined = selectedOffer ? createMapPoint(selectedOffer) : undefined;

  return [mapCity, mapPoints, selectedMapPoint];
}

export default getMapDataFromOffers;
