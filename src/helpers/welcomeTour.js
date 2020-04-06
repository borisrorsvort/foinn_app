export const steps = [
  {
    placement: "center",
    target: "body",
    title: "Wecome to Foinn!",
    content:
      "You can now easily access you tunes and sets from thesession.org in a nicer way and use it to practice or in a session. Due to restrictions of thesession.org, we can only read what you have configured there. Therefore to add or remove tunes in your tunebook or sets, you’ll need to login to thesession.org and make your changes there."
  },

  {
    target: "#tunesList",
    title: "Tunes list",
    placement: "auto",
    content: "Click on a tune to see all the settings and musicsheet"
  },

  {
    target: "#filtersForm",
    title: "Search & Filters",
    placement: "left",
    content: "Click on this button to access the app navigation"
  },
  {
    target: "#navToggle",
    title: "Navigation",
    placement: "bottom",
    content: "Access the app navigation for Sets, tunes, help or change user"
  }
];

export const stepsStyles = {
  options: {
    primaryColor: "#357a38"
  },
  tooltipContainer: {
    textAlign: "left"
  },
  tooltipContent: {
    padding: "20px 0"
  }
};
