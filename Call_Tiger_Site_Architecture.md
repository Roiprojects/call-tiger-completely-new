# CALL TIGER — COMPONENT-LEVEL SITE ARCHITECTURE
*Complete Blueprint of Every Component, Screen, Filter, and Tool to be Built*

---

## 1. GLOBAL NAVIGATION & LAYOUT COMPONENTS
* **`<AppHeader />`**
  * Brand Wordmark (*"CALL TIGER"*)
  * Concierge Call Button (`tel:...`)
  * `[ Admin Portal ]` toggle button to switch between Client and Admin
* **`<ListingNavBar />`**
  * `[ Back ]` Navigation Button (returns to previous state)
  * `[ Home ]` Navigation Button (instant reset to Home Page)
  * Active Section Title Indicator (e.g., *"Commercial Properties"*, *"Office Space"*)
* **`<AppFooter />`**
  * Discretion & Confidentiality notice
  * Direct vs. Indirect mandate disclosure
  * Quick WhatsApp and phone contact triggers

---

## 2. HOME PAGE COMPONENTS (Page 1)
* **`<FoundersLetterBox />`**
  * Top reading container for: **"Letter (provided by me)"**
  * Clean typography container for your welcome manifesto on trust and discretion
* **`<CategorySwitchBar />`**
  * **`[ Commercial ]`** toggle button
  * **`[ Residential ]`** toggle button
* **`<SegmentLaunchGrid />`**
  * 10 Interactive Category Cards in a 2-column grid:
    1. `[ Office Space ]`
    2. `[ Land ]`
    3. `[ Commercial 10 – 50 Cr ]`
    4. `[ Commercial 50 – 1000 Cr ]`
    5. `[ Gated Community ]`
    6. `[ Beautiful Bungalows ]`
    7. `[ Site Below 4000 sq.ft ]`
    8. `[ Site Above 4000 sq.ft ]`
    9. `[ Hot Commercial ]`
    10. `[ Hot Residential ]`

---

## 3. FILTER & SORTING COMPONENTS (Pages 2 to 6)
* **`<AreaFilterChips />`**
  * Horizontal chip bar: `[ All Areas ]` `[ Area 1 ]` `[ Area 2 ]` `[ Area 3 ]` ...
  * Dynamically populated from the Admin Area Manager
* **`<AreaDropdownSelector />`**
  * Dropdown selector for Area filtering (used on Commercial scale views & Hot feeds)
* **`<SortToggleButtons />`**
  * `[ Low to High ]` and `[ High to Low ]` buttons to sort listings by price in ₹ Crores
* **`<ResidentialTypeSwitch />`**
  * `[ Site ]` vs. `[ Home / Bungalow ]` chips
* **`<ScaleTypeSwitch />`**
  * `[ Site ]` vs. `[ Building ]` chips
* **`<WorkstationFilterChips />`** *(Office Space View)*
  * `[ 50 – 100 ]` `[ 100 – 200 ]` `[ 200 – 500 ]` `[ 500 – 5000 ]` Workstations
* **`<LandClassificationChips />`** *(Land View)*
  * `[ Agricultural Land ]` `[ Industrial Land ]` `[ Converted Land ]` `[ Within City Land ]`
* **`<HotCommercialPriceChips />`** *(Hot Commercial View)*
  * `[ 5 – 10 Cr ]` `[ 10 – 20 Cr ]` `[ 20 – 50 Cr ]` `[ 50 – 100 Cr ]`
* **`<HotResidentialPriceChips />`** *(Hot Residential View)*
  * `[ 0 – 10 Cr ]` `[ 10 – 20 Cr ]` `[ 20 – 50 Cr ]` `[ 50 – 200 Cr ]`

---

## 4. PROPERTY DISPLAY COMPONENTS (Strictly No Images)
* **`<PropertyCard />`** *(Text-Only Executive Data Card)*
  * Property ID Code (e.g. `CT-OFF-104`)
  * Mandate Badge: `[ Direct Mandate ]` or `[ Indirect Mandate ]`
  * Hot Deal Badge: `[ 🔥 Hot Commercial ]` or `[ 🔥 Hot Residential ]`
  * Property Title & Area / Location Tag
  * Valuation in ₹ Crores (Bold display)
  * Dynamic Metric Spec Grid:
    * *Bungalows:* BHK, Plot area, Built-up area, Facing
    * *Sites:* Plot size, Dimensions (30×40, 40×60, etc.), Facing
    * *Commercial:* Plot, Built-up, Monthly Rental Income, Facing
    * *Office:* Workstations count, Cabins count
    * *Land:* Survey No., Acres, Sq.ft, Road width, Frontage, Land Type
  * Description & notes text block
  * Action Buttons: `[ 📞 Call Tiger ]` & `[ 💬 WhatsApp ]`
* **`<PropertyListContainer />`**
  * Responsive list container with `<EmptyResultsNotice />` when no matches exist
* **`<PrivateEnquiryModal />`**
  * Form modal for private consultation with property summary, client name, phone number, and callback time

---

## 5. ADMIN PANEL COMPONENTS (Admin Pages 1 to 3)
* **`<AdminDashboardStats />`**
  * Overview counters: Total Properties, Commercial vs. Residential, Hot Deals, Direct vs. Indirect
* **`<AreaManagerModule />`**
  * Active Area List
  * "Add New Area" input field + `[ Add Area ]` button (instantly updates client filters)
* **`<CategoryFormSelector />`**
  * Dropdown selector to switch between the 5 property forms
* **5 Specialized Property Forms:**
  1. **`<BungalowBuildingForm />`:** BHK, Plot area, Built-up area, Facing, Details
  2. **`<SiteForm />`:** Plot size, Dimensions (30×40, 40×60, etc.), Facing, Details
  3. **`<CommercialBuildingForm />`:** Plot, Built-up, Monthly Rental Income, Facing, Details
  4. **`<OfficeSpaceForm />`:** Workstation count, Cabins count, Details
  5. **`<LandParcelForm />`:** Survey No., Land Type, Road Width, Frontage, Acres, Sq.ft, Details
* **`<UniversalPropertyFields />`**
  * Location Area dropdown (with new area shortcut)
  * Price input (₹ Crores)
  * Checkboxes: `[ ] Hot Commercial` | `[ ] Hot Residential`
  * Checkboxes: `[ ] Direct` | `[ ] Indirect`
  * `[ Save Property ]` Button (instantly publishes live)
* **`<AdminListingTable />`**
  * Table of all existing properties with Search, Filter, Edit, and Delete buttons
