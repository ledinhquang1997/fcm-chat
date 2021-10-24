import React from 'react';
import styles from './listing.module.css';
import ListingItem from './ListingItem';

const data = [
  {
    listing_id: 'd138ad22-4dd1-4e6d-8a96-901eb1db6880',
    member_id: '4deca7f0-ba91-4f9d-adb9-656076abc1a4',
    name: 'Cong',
    title: 'Listing 1',
  },
  {
    listing_id: '2d4d79c8-5276-45a8-bc8f-a4c7c58c0102',
    member_id: '4deca7f0-ba91-4f9d-adb9-656076abc1a4',
    name: 'Cong',
    title: 'Listing 2',
  },
  {
    listing_id: 'e46d537e-f28a-481b-b2e6-009c723c3651',
    member_id: '56a5fb9b-6c69-4d8d-8a06-828c11288783',
    name: 'Big Tyrm',
    title: 'Listing 3',
  },
  {
    listing_id: '16373e08-bdf4-49be-80d6-94bab6a2873b',
    member_id: 'bb8fdd56-ef85-4793-b3df-af8b1a256c8e',
    name: 'Abdulmohsen',
    title: 'Listing 5',
  },
  {
    listing_id: 'bb8fdd56-ef85-4793-b3df-af8b1a256c8e',
    member_id: 'bb8fdd56-ef85-4793-b3df-af8b1a256c8e',
    name: 'Abdulmohsen',
    title: 'Listing 6',
  },
];

export default function Listing() {
  return (
    <div style={{color: 'black'}}>
      <ul>
        {data.map(listingItem => <ListingItem key={listingItem.listing_id} listingItem={listingItem}/>)}{/* <ListingItem/> */}
      </ul>
    </div>
  );
}
