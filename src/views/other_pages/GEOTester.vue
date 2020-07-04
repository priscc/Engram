<template>
  <div id="app">
    <div class="legend"></div>
  <div class="view" id="map"></div>
  </div>

</template>

<script type="text/javascript">
import countries from '@/countries.json'
import * as d3 from 'd3'

export default {
  data () {
    return {
      sets: [
        {
          name: 'Central Europe',
          set: d3.set(['BEL', 'CHE', 'DEU', 'AUT', 'ESP', 'FRA', 'ATF', 'GBR', 'GGY', 'JEY', 'FLK', 'SGS', 'GRC', 'MLT', 'IRL', 'ITA', 'LUX', 'NLD', 'AND', 'POL', 'PRT', 'TUR', 'CYP', 'CYN', 'MON', 'ALD', 'IMN', 'LTU', 'LVA', 'EST', 'BLR', 'UKR', 'MDA', 'ROU', 'HUN', 'SVK', 'SVN', 'HRV', 'BIH', 'CZE', 'BGR', 'KOS', 'MKD', 'ALB', 'MNE', 'SRB'])
        },
        {
          name: 'Northern Europe',
          set: d3.set(['DNK', 'FRO', 'FIN', 'GRL', 'ISL', 'NOR', 'SWE'])
        },
        {
          name: 'North America',
          set: d3.set(['CAN', 'MEX', 'USA'])
        },
        {
          name: 'Caribbean',
          set: d3.set(['BLZ', 'CRI', 'CUB', 'GTM', 'HND', 'NIC', 'PAN', 'SLV', 'HTI', 'JAM', 'DOM', 'PRI', 'BHS', 'TCA', 'ATG', 'DMA', 'BRB', 'GRD'])
        },
        {
          name: 'South America',
          set: d3.set(['ARG', 'BOL', 'BRA', 'CHL', 'COL', 'ECU', 'FLK', 'GUY', 'PRY', 'PER', 'SUR', 'URY', 'VEN', 'TTO'])
        },
        {
          name: 'Africa',
          set: d3.set(['AGO', 'BDI', 'BEN', 'BFA', 'BWA', 'CAF', 'CIV', 'CMR', 'COD', 'COD', 'COG', 'COM', 'CPV', 'DJI', 'DZA', 'EGY', 'ERI', 'ETH', 'GAB', 'GHA', 'GIN', 'GMB', 'GNB', 'GNQ', 'KEN', 'LBR', 'LBY', 'LSO', 'MAR', 'MDG', 'MLI', 'MOZ', 'MRT', 'MUS', 'MWI', 'MYT', 'NAM', 'NER', 'NGA', 'REU', 'RWA', 'ESH', 'SDN', 'SDS', 'SEN', 'SHN', 'SHN', 'SLE', 'SOM', 'SOL', 'SSD', 'STP', 'STP', 'SWZ', 'SYC', 'TCD', 'TGO', 'TUN', 'TZA', 'TZA', 'UGA', 'ZAF', 'ZMB', 'ZWE'])
        },
        {
          name: 'South Pacific',
          set: d3.set(['AUS', 'NZL'])
        },
        {
          name: 'India',
          set: d3.set(['IND', 'BGD', 'LKA'])
        },
        {
          name: 'Orient',
          set: d3.set(['AZE', 'ARE', 'QAT', 'IRN', 'AFG', 'PAK', 'BHR', 'SAU', 'YEM', 'OMN', 'SYR', 'JOR', 'IRQ', 'KWT', 'ISR', 'LBN', 'PSX', 'PSR', 'GEO', 'ARM'])
        },
        {
          name: 'Russia',
          set: d3.set(['RUS', 'KAZ', 'UZB', 'TKM', 'KGZ', 'TJK'])
        },
        {
          name: 'Asia',
          set: d3.set(['BTN', 'CHN', 'JPN', 'IDN', 'MNG', 'NPL', 'MMR', 'THA', 'KHM', 'LAO', 'VNM', 'PRK', 'KOR', 'TWN', 'MYS', 'PNG', 'SLB', 'VUT', 'NCL', 'BRN', 'PHL', 'TLS', 'HKG', 'FJI', 'GUM', 'PLW', 'FSM', 'MNP', 'KAS'])
        }
      ]
    }
  },
  methods: {
    primary () {
      d3.select(window).on('resize', this.resize)

      var width = document.querySelector('#map').offsetWidth
      var mapRatio = 0.7
      var height = width * mapRatio

      var projection = d3.geo.mercator().scale(width / 2 / Math.PI)
        .rotate([-11, 0])
        .translate([(width) / 2, height * 1.35 / 2])
        .precision(0.1)

      var path = d3.geo.path().projection(projection)

      var svg = d3.select('#map')
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin')
        .attr('width', width)
        .attr('height', height)
        .append('g')

      d3.json(countries, function (error, w) {
        if (error) throw error

        svg.append('path').datum(topojson.merge(w, w.objects.units.geometries.filter(function (d) {
          return d.id !== 'ATA' // Sorry Antarctica
        })))
          .attr('class', 'border')
          .attr('d', path)

        for (var i = 0; i < this.sets.length; i++) {
          svg.append('path').datum(topojson.merge(w, w.objects.units.geometries.filter(function (d) {
            return this.sets[i].set.has(d.id)
          })))
            .attr('class', 'regions selected')
            .attr('d', path)
            .attr({ 'data-name': this.sets[i].name })
            .on('mouseover', function () {
              var region = d3.select(this)
              document.querySelector('.legend').innerText = region.attr('data-name')
            }).on('mouseout', function () {
              document.querySelector('.legend').innerText = ''
            })
        }
      })
    },
    resize () {
      var width = document.querySelector('#map').offsetWidth
      var mapRatio = 0.7
      var height = width * mapRatio

      // adjust things when the window size changes
      width = document.querySelector('#map').offsetWidth
      // width = width - margin.left - margin.right;
      height = width * mapRatio

      // update projection
      projection.scale(width / 2 / Math.PI)
        .translate([(width) / 2, height * 1.35 / 2])
        .precision(0.1)
        // resize the map container
      document.querySelector('svg').setAttribute('width', width)
      document.querySelector('svg').setAttribute('height', height)

      // resize the map
      svg.selectAll('.regions, .border').attr('d', path)
    }

  },
  mounted () {
    this.primary()
  }
}
</script>

<style scrope>
    body {
        background: #222;
        font-family: sans-serif;
    }

    .border {
        fill: none;
        stroke: #d9edf7;
        stroke-width: 1px;
    }

    .regions.selected {
        fill: #222;
        stroke: none;
        transition: all 0.2s ease;
    }

    .regions.selected:hover {
        fill: #d9edf7;
        stroke: #d9edf7;
        stroke-width: 1px;
    }

    .legend {
        height: 10px;
        color: #CCC;
        text-align: center;
    }

</style>
<body>
