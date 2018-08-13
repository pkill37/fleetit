# docs

## Development

```
cd src/
docker run --rm -v "$PWD:/gitbook" -p 4000:4000 billryan/gitbook gitbook serve
```

## Deployment

```
cd src/
docker run --rm -v "$PWD:/gitbook" billryan/gitbook gitbook build
rsync -crvz --rsh='ssh' --delete-after --delete-excluded ./_book/* es2017-2018_g201@xcoa.av.it.pt:public_html/docs
```

