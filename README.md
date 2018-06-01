# broker

## Development

Build all images:

```
./build.sh
```

Start the cluster and containers and pray that the services converge:

```
docker swarm init --force-new-cluster
docker stack deploy -c development.yml fleetit
```

Stop the containers and leave the cluster:

```
docker stack rm fleetit
docker swarm leave --force
```

## Monitoring

Before seeing the dashboards, you need to first import some of the custom ones by running the
following script:

```
./import_dashboards.sh
```

Then you can access them by using the following links:

[System Dashboard](http://127.0.0.1:5601/app/kibana#/dashboard/79ffd6e0-faa0-11e6-947f-177f697178b8?_g=()&_a=(description:'',filters:!(),fullScreenMode:!t,options:(darkTheme:!f,useMargins:!f),panels:!((gridData:(h:3,i:'1',w:6,x:0,y:11),id:'6b7b9a40-faa1-11e6-86b1-cd7735ff7e23',panelIndex:'1',type:visualization,version:'6.2.3'),(gridData:(h:3,i:'2',w:6,x:6,y:5),id:'4d546850-1b15-11e7-b09e-037021c4f8df',panelIndex:'2',type:visualization,version:'6.2.3'),(gridData:(h:3,i:'3',w:6,x:6,y:11),id:'089b85d0-1b16-11e7-b09e-037021c4f8df',panelIndex:'3',type:visualization,version:'6.2.3'),(gridData:(h:3,i:'4',w:6,x:0,y:8),id:bfa5e400-1b16-11e7-b09e-037021c4f8df,panelIndex:'4',type:visualization,version:'6.2.3'),(gridData:(h:3,i:'5',w:6,x:6,y:14),id:e0f001c0-1b18-11e7-b09e-037021c4f8df,panelIndex:'5',type:visualization,version:'6.2.3'),(gridData:(h:3,i:'6',w:6,x:0,y:14),id:'2e224660-1b19-11e7-b09e-037021c4f8df',panelIndex:'6',type:visualization,version:'6.2.3'),(gridData:(h:3,i:'7',w:6,x:0,y:5),id:ab2d1e90-1b1a-11e7-b09e-037021c4f8df,panelIndex:'7',type:visualization,version:'6.2.3'),(gridData:(h:3,i:'8',w:6,x:6,y:8),id:'4e4bb1e0-1b1b-11e7-b09e-037021c4f8df',panelIndex:'8',type:visualization,version:'6.2.3'),(gridData:(h:2,i:'9',w:2,x:4,y:1),id:'26732e20-1b91-11e7-bec4-a5e9ec5cab8b',panelIndex:'9',type:visualization,version:'6.2.3'),(gridData:(h:2,i:'10',w:2,x:0,y:1),id:'83e12df0-1b91-11e7-bec4-a5e9ec5cab8b',panelIndex:'10',type:visualization,version:'6.2.3'),(gridData:(h:2,i:'11',w:2,x:2,y:1),id:d3166e80-1b91-11e7-bec4-a5e9ec5cab8b,panelIndex:'11',type:visualization,version:'6.2.3'),(gridData:(h:2,i:'12',w:2,x:6,y:1),id:'522ee670-1b92-11e7-bec4-a5e9ec5cab8b',panelIndex:'12',type:visualization,version:'6.2.3'),(gridData:(h:2,i:'13',w:2,x:8,y:1),id:'1aae9140-1b93-11e7-8ada-3df93aab833e',panelIndex:'13',type:visualization,version:'6.2.3'),(gridData:(h:2,i:'14',w:4,x:8,y:3),id:'34f97ee0-1b96-11e7-8ada-3df93aab833e',panelIndex:'14',type:visualization,version:'6.2.3'),(gridData:(h:1,i:'16',w:6,x:0,y:0),id:System-Navigation,panelIndex:'16',type:visualization,version:'6.2.3'),(gridData:(h:2,i:'21',w:2,x:0,y:3),id:'19e123b0-4d5a-11e7-aee5-fdc812cc3bec',panelIndex:'21',type:visualization,version:'6.2.3'),(gridData:(h:2,i:'22',w:2,x:2,y:3),id:d2e80340-4d5c-11e7-aa29-87a97a796de6,panelIndex:'22',type:visualization,version:'6.2.3'),(gridData:(h:2,i:'23',w:2,x:6,y:3),id:'825fdb80-4d1d-11e7-b5f2-2b7c1895bf32',panelIndex:'23',type:visualization,version:'6.2.3'),(gridData:(h:2,i:'25',w:2,x:10,y:1),id:'96976150-4d5d-11e7-aa29-87a97a796de6',panelIndex:'25',type:visualization,version:'6.2.3'),(gridData:(h:3,i:'27',w:6,x:0,y:17),id:'99381c80-4d60-11e7-9a4c-ed99bbcaa42b',panelIndex:'27',type:visualization,version:'6.2.3'),(gridData:(h:3,i:'28',w:6,x:6,y:17),id:c5e3cf90-4d60-11e7-9a4c-ed99bbcaa42b,panelIndex:'28',type:visualization,version:'6.2.3'),(embeddableConfig:(vis:(defaultColors:('0%20-%20100':'rgb(0,104,55)'))),gridData:(h:2,i:'29',w:2,x:4,y:3),id:'590a60f0-5d87-11e7-8884-1bb4c3b890e4',panelIndex:'29',type:visualization,version:'6.2.3'),(gridData:(h:1,i:'30',w:6,x:6,y:0),id:'3d65d450-a9c3-11e7-af20-67db8aecb295',panelIndex:'30',type:visualization,version:'6.2.3')),query:(language:lucene,query:'beat.name:%2299c5e1ee5625%22'),timeRestore:!f,title:'%5BMetricbeat%20System%5D%20Host%20overview',viewMode:view))

[Docker Dashboard](http://127.0.0.1:5601/app/kibana#/dashboard/AV4REOpp5NkDleZmzKkE?_g=()&_a=(description:'',filters:!(),fullScreenMode:!t,options:(darkTheme:!f,useMargins:!f),panels:!((embeddableConfig:(vis:(params:(sort:(columnIndex:1,direction:asc)))),gridData:(h:5,i:'1',w:7,x:0,y:0),id:Docker-containers,panelIndex:'1',type:visualization,version:'6.2.3'),(embeddableConfig:(vis:(defaultColors:('0%20-%20100':'rgb(0,104,55)'))),gridData:(h:2,i:'2',w:5,x:7,y:0),id:Docker-Number-of-Containers,panelIndex:'2',type:visualization,version:'6.2.3'),(embeddableConfig:(vis:(legendOpen:!t)),gridData:(h:3,i:'3',w:2,x:7,y:2),id:Docker-containers-per-host,panelIndex:'3',type:visualization,version:'6.2.3'),(embeddableConfig:(vis:(legendOpen:!f)),gridData:(h:3,i:'4',w:6,x:0,y:5),id:Docker-CPU-usage,panelIndex:'4',type:visualization,version:'6.2.3'),(embeddableConfig:(vis:(legendOpen:!f)),gridData:(h:3,i:'5',w:6,x:6,y:5),id:Docker-memory-usage,panelIndex:'5',type:visualization,version:'6.2.3'),(embeddableConfig:(vis:(legendOpen:!f)),gridData:(h:3,i:'6',w:12,x:0,y:8),id:Docker-Network-IO,panelIndex:'6',type:visualization,version:'6.2.3'),(embeddableConfig:(vis:(legendOpen:!f)),gridData:(h:3,i:'7',w:3,x:9,y:2),id:Docker-images-and-names,panelIndex:'7',type:visualization,version:'6.2.3')),query:(language:lucene,query:(query_string:(analyze_wildcard:!t,default_field:'*',query:'*'))),timeRestore:!f,title:'%5BMetricbeat%20Docker%5D%20Overview',viewMode:view))

[Nginx Dashboard](http://127.0.0.1:5601/app/kibana#/dashboard/023d2930-f1a5-11e7-a9ef-93c69af7b129?_g=()&_a=(description:'Overview%20dashboard%20for%20the%20Nginx%20module%20in%20Metricbeat',filters:!(),fullScreenMode:!t,options:(darkTheme:!f,hidePanelTitles:!f,useMargins:!t),panels:!((gridData:(h:3,i:'1',w:6,x:6,y:0),id:'555df8a0-f1a1-11e7-a9ef-93c69af7b129',panelIndex:'1',type:visualization,version:'7.0.0-alpha1'),(gridData:(h:3,i:'2',w:6,x:6,y:3),id:a1d92240-f1a1-11e7-a9ef-93c69af7b129,panelIndex:'2',type:visualization,version:'7.0.0-alpha1'),(gridData:(h:3,i:'3',w:6,x:0,y:3),id:d763a570-f1a1-11e7-a9ef-93c69af7b129,panelIndex:'3',type:visualization,version:'7.0.0-alpha1'),(gridData:(h:3,i:'4',w:6,x:0,y:0),id:'47a8e0f0-f1a4-11e7-a9ef-93c69af7b129',panelIndex:'4',type:visualization,version:'7.0.0-alpha1'),(gridData:(h:3,i:'5',w:12,x:0,y:6),id:dcbffe30-f1a4-11e7-a9ef-93c69af7b129,panelIndex:'5',type:visualization,version:'7.0.0-alpha1')),query:(language:lucene,query:''),timeRestore:!f,title:'%5BMetricbeat%20Nginx%5D%20Overview',viewMode:view))

[PostgreSQL Dashboard](http://127.0.0.1:5601/app/kibana#/dashboard/69845e60-6356-11e8-9c42-7b9bbbce7ccf?_g=()&_a=(description:'',filters:!(),fullScreenMode:!t,options:(darkTheme:!f,hidePanelTitles:!f,useMargins:!t),panels:!((gridData:(h:4,i:'1',w:12,x:0,y:3),id:'079363f0-6355-11e8-9c42-7b9bbbce7ccf',panelIndex:'1',title:Queries,type:search,version:'6.2.3'),(embeddableConfig:(vis:(legendOpen:!f)),gridData:(h:3,i:'2',w:6,x:0,y:0),id:a6ae3890-6371-11e8-b017-a1352cae8163,panelIndex:'2',title:'Query%20Count',type:visualization,version:'6.2.3'),(gridData:(h:3,i:'3',w:3,x:9,y:0),id:'07666f70-6374-11e8-b017-a1352cae8163',panelIndex:'3',title:'',type:visualization,version:'6.2.3'),(gridData:(h:3,i:'4',w:3,x:6,y:0),id:'93c81680-6374-11e8-b017-a1352cae8163',panelIndex:'4',title:'',type:visualization,version:'6.2.3')),query:(language:lucene,query:''),timeRestore:!f,title:Postgresql,viewMode:view))
