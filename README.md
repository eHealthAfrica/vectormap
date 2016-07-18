# Kibana Vector Map Plugin
A Vector Map Plugin for Kibana 4

Fork that [adds a Sierra Leone](sierra-leone-map) map
for regions and districts

![Kibana Vector Map](vectormap.png)

### Requirements
Kibana 4.3+

### Installation steps
1. Download and unpack [Kibana](https://www.elastic.co/downloads/kibana).
2. From the Kibana root directory, install the plugin with the following command:

```
$ bin/kibana plugin -i vectormap -u https://github.com/eHealthAfrica/vectormap/archive/master.zip
```

### Sierra Leone Map

Instructions to create [Sierra Leone Maps](./sierra_leone_maps/Readme.md)


### Colors & Values

We modified the code, adding a harcoded maximum (125) and minimum (0) value for the
dataset. We also assume that the data are percentages

In the options it is possible to add as many colors to the scale as needed
