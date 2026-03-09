
## Plan: Comprehensive Trip Planning Tool

### Current Analysis
- **Existing bookings**: Individual items stored in UserContext (id, title, type, date, price, status, image)
- **AiPlanner**: Currently just a UI shell with no functionality 
- **Dashboard**: Shows individual bookings without grouping or trip organization
- **No trip concept**: Need to create Trip/Itinerary data structure to group related bookings

### Core Trip Planning Features

#### 1. Trip Data Structure & Context
**New Trip Type**:
```typescript
export type Trip = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  bookingIds: string[]; // References to existing bookings
  status: "planning" | "booked" | "completed";
  totalBudget?: number;
  notes?: string;
  image?: string;
}
```

**Extended UserContext**:
- Add `trips[]` array and trip management functions
- `createTrip()`, `updateTrip()`, `deleteTrip()`, `addBookingToTrip()`
- Persist trips to localStorage

#### 2. Enhanced Trip Planner (Transform AiPlanner)
**Multi-step Planning Interface**:
```text
Step 1: Basic Info → Destination, dates, budget, travelers
Step 2: Booking Categories → Select flight, stay, activities, etc.
Step 3: Timeline View → Drag & drop bookings, adjust dates
Step 4: Budget Overview → Total cost breakdown
Step 5: Save Trip → Create itinerary, book items
```

**Features**:
- Interactive destination search with date picker
- Budget tracker with real-time calculations  
- Pre-filled suggestions based on destination/duration
- "Smart suggestions" based on booking history and preferences

#### 3. Trip Timeline & Calendar View
**Interactive Timeline Component**:
- Horizontal timeline showing trip duration
- Drag-and-drop bookings onto specific dates/times
- Visual conflicts detection (overlapping flights/hotels)
- Daily cost breakdown with budget alerts

**Calendar Integration**:
- Monthly view showing all trips
- Day detail view with hour-by-hour itinerary
- Sync with individual bookings dates

#### 4. Trip Dashboard Integration
**New Dashboard Tab**: "Mis Viajes" alongside existing tabs
- Trip cards with destination, dates, progress status
- Quick actions: Edit, Share, Duplicate trip
- Progress indicators (% booked, budget used)

#### 5. Smart Trip Organization
**Auto-grouping Logic**:
- Suggest grouping existing bookings by date proximity and location  
- "Convert bookings to trip" functionality for related items
- Duplicate detection and merging suggestions

### File Structure

#### New Components
| File | Purpose |
|------|---------|
| `src/components/trip/TripCard.tsx` | Trip summary card for dashboard |
| `src/components/trip/TripTimeline.tsx` | Interactive timeline with drag-drop |
| `src/components/trip/TripCalendarView.tsx` | Monthly calendar with trip overview |
| `src/components/trip/BudgetTracker.tsx` | Real-time budget calculation |
| `src/components/trip/BookingSelector.tsx` | Select/add bookings to trip |
| `src/pages/TripPlanner.tsx` | Multi-step trip creation (replaces AiPlanner) |
| `src/pages/TripDetail.tsx` | Individual trip management page |

#### Modified Files  
| File | Changes |
|------|---------|
| `src/contexts/UserContext.tsx` | Add Trip type, trips array, trip management functions |
| `src/pages/Dashboard.tsx` | Add "Mis Viajes" tab with trip management |
| `src/App.tsx` | Add routes: `/trip-planner`, `/trip/:id` |
| `src/components/layout/Navbar.tsx` | Update "AI Planner" to "Trip Planner" |

### Implementation Priority
1. **Trip data structure** - Extend UserContext with Trip type and functions
2. **Trip dashboard tab** - Add trips view to existing Dashboard  
3. **Basic trip creation** - Simple form to create trips and add existing bookings
4. **Timeline component** - Interactive drag-drop timeline for trip organization
5. **Enhanced planner** - Transform AiPlanner into comprehensive trip builder
6. **Calendar views** - Monthly overview and detailed day views

### Key User Flows
1. **Create Trip**: Planner → Basic Info → Add Bookings → Timeline Organize → Save
2. **Manage Existing**: Dashboard → Trips Tab → Edit → Timeline → Budget Check
3. **Auto-organize**: Dashboard → "Group Bookings" → AI suggests trips → Confirm
4. **Book Trip**: Trip Detail → "Book All" → Batch booking with confirmation

**Note**: Real AI suggestions require Lovable Cloud. Current implementation will use rule-based suggestions (dates, locations, booking types).
