# Grafana Status Panel

This is a plugin meant to be used as a centralized view for the status of a server/cluster in a glance.
It is very similar to the Single Stat panel, but it can hold multiple values and you can customize the thresholds for each of them separately.

## The General Idea
Lets say that you want to monitor a bunch of servers, and you want to keep track of multiple stats for each of them, and see in a glance the status of all of them.

This plugin will make it easier to do. You just add all the measurements that you want to track, set the threshold for each (you could also repeat the panel on a template if you have multiple instances that you want to watch) and you get an overview that will report to you if there is anything wrong with any measurements. That means that if all the measurements are is the OK zone, the panel will be green. if evan one of the measurements is in the WARNING zone, it will be yellow, and red if any of them is CRITICAL.

## How to use
1. Add the queries you want to the panel and give each of them a unique alias
2. Choose the name of the panel to be displayed in the `Panel Title` field.
  **Note:** this field supports Grafana templates, so if you repeat the panel the correct name will show
3. Go the the Options tab, and enter the `Warning` and `Critical` thresholds for each of your queries
4. If the query returns multiple values, choose the type of aggregation you want to be used (`None` will just use the most first result)
5. If you want the result to always be displayed with it's value (regardless to the thresholds), check the box titled `Show Value`

## Other Features

### Remove Prefix
The plugins has a 'Remove Prefix' field in the configuration. This field is is meant for easier renaming of the panels when you repeat them from a Grafana template.

i.e. you recognize your servers by domain, and they are all name in the following way `www.general-prefix.server.com`, and you would like to remove the prefix from the display, then you enter `www.general-prefix.` and all the panels will only display the `server.com` part.

### Measurement URL
Lets say that you want your user the be able to get instructions on what to do when a certain measurement is at Warning or Critical levels. Just put a link in this field and the name will become clickable, and send your user to any URL you desire (like an internal wiki).

## Supported Data Sources
Currently the plugin was tested with influxDB. Support for other data sources could be added by demand

# Screenshots
### Panel States
![ok](https://github.com/Vonage/Grafana_Status_panel/blob/develop/src/img/ok.png?raw=true)
![warning](https://github.com/Vonage/Grafana_Status_panel/blob/develop/src/img/warning.png?raw=true)
![error](https://github.com/Vonage/Grafana_Status_panel/blob/develop/src/img/error.png?raw=true)

### The end result should look like this
![Result](https://github.com/Vonage/Grafana_Status_panel/blob/develop/src/img/environment_snapshot.png?raw=true)

# License

See the [LICENSE](https://github.com/Vonage/Grafana_Status_panel/blob/master/LICENSE.txt) file for license rights and limitations (Apache License, Version 2.0)
