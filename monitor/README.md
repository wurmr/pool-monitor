# Pool Monitor

## Building Docker Image

### Live

```
$ docker build . -t monitor
```

### Debug

```
$ docker build . -f Dockerfile.debug -t monitor-debug
```

## Running

### Live

```
$ docker run --device /dev/i2c-1 --rm -p 4000:4000 --restart=always --name=monitor monitor
```

### Debug

```
$ docker run --device /dev/i2c-1 -d -p 4000:4000 --restart=always -v /home/pi/source/pool-monitor/monitor:/work --name=monitor-debug monitor-debug
```
