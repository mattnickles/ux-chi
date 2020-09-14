document.addEventListener('DOMContentLoaded',
  function() {
    lux.expansionPanel(document.getElementById('example2'));
    lux.expansionPanel(document.querySelectorAll('[data-lux-epanel-group="example3"]'));
    lux.expansionPanel(document.querySelectorAll('[data-lux-epanel-group="example4"]'), {mode: 'accordion'});
    lux.expansionPanel(document.querySelectorAll('[data-lux-epanel-group="example5"]'), {mode: 'free'});

    lux.expansionPanel(
      document.querySelectorAll('[data-lux-epanel-group="example6"]'),
      {
        mode: 'custom',
        changeHandler: function (newState, oldState, expansionPanel, panelGroup) {
          if (newState === lux.EXPANSION_PANEL_STATES.DONE) {
            panelGroup.expansion_panels.forEach(function (exPa) {
              if (exPa !== expansionPanel) {
                exPa.setState(lux.EXPANSION_PANEL_STATES.PENDING.NAME);
              }
            });
          }
        }
      }
    );

    lux.tab(document.querySelectorAll('.docs-body__content .lux-tabs'));

  }
);
