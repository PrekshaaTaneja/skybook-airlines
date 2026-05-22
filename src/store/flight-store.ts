import { create } from "zustand";

import { persist } from "zustand/middleware";

import { Flight } from "@/types/database";

interface PassengerData {
  fullName: string;
  passportNo: string;
  nationality: string;
  dob: string;
}

interface FlightStore {
  selectedFlight: Flight | null;

  selectedSeatId: string | null;

  selectedSeatNumber: string | null;

  currentStep: number;

  passengerData: PassengerData;

  setSelectedFlight: (
    flight: Flight
  ) => void;

  setSelectedSeat: (
    seatId: string,
    seatNumber: string
  ) => void;

  setCurrentStep: (
    step: number
  ) => void;

  setPassengerData: (
    data: PassengerData
  ) => void;

  resetBooking: () => void;
}

export const useFlightStore =
  create<FlightStore>()(
    persist(
      (set) => ({
        selectedFlight: null,

        selectedSeatId: null,

        selectedSeatNumber: null,

        currentStep: 1,

        passengerData: {
          fullName: "",
          passportNo: "",
          nationality: "",
          dob: "",
        },

        setSelectedFlight: (
          flight
        ) =>
          set({
            selectedFlight: flight,
          }),

        setSelectedSeat: (
          seatId,
          seatNumber
        ) =>
          set({
            selectedSeatId: seatId,
            selectedSeatNumber:
              seatNumber,
          }),

        setCurrentStep: (
          step
        ) =>
          set({
            currentStep: step,
          }),

        setPassengerData: (
          data
        ) =>
          set({
            passengerData: data,
          }),

        resetBooking: () =>
          set({
            selectedFlight: null,

            selectedSeatId: null,

            selectedSeatNumber:
              null,

            currentStep: 1,

            passengerData: {
              fullName: "",
              passportNo: "",
              nationality: "",
              dob: "",
            },
          }),
      }),

      {
        name: "flight-booking-store",

        partialize: (state) => ({
          selectedFlight:
            state.selectedFlight,

          selectedSeatId:
            state.selectedSeatId,

          selectedSeatNumber:
            state.selectedSeatNumber,

          currentStep:
            state.currentStep,

          passengerData: {
            fullName:
              state.passengerData
                .fullName,

            nationality:
              state.passengerData
                .nationality,

            dob: state
              .passengerData.dob,

            passportNo: "",
          },
        }),
      }
    )
  );