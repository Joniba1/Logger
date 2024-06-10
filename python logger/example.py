import os
import json
import asyncio
from logger_python import Logger  # Import the Logger class from your module

# def main():
logger = Logger()

logger.start('example_log', {'key': 'value', 'dude': 'bro'})
logger.event('1', {'bbox': 'value'}, {'telemetry': 'data'})
logger.event('2', {'bbox': 'value'}, {'telemetry': 'data'})
logger.event('3', {'bbox': 'value'}, {'telemetry': 'data'})
logger.event('4', {'bbox': 'value'}, {'telemetry': 'data'})
logger.event('5', {'bbox': 'value'}, {'telemetry': 'data'})
logger.event('6', {'bbox': 'value'}, {'telemetry': 'data'})
logger.event('7', {'bbox': 'value'}, {'telemetry': 'data'})
logger.event('8', {'bbox': 'value'}, {'telemetry': 'data'})
logger.event('9', {'bbox': 'value'}, {'telemetry': 'data'})
logger.event('10', {'bbox': 'value'}, {'telemetry': 'data'})
logger.event('11', {'bbox': 'value'}, {'telemetry': 'data'})
logger.terminate()    
logger.start('example_log2', {'key': 'value', 'dude': 'bro'})
logger.event('2', {'bbox': 'value'}, {'telemetry': 'data'})
    
# asyncio.run(main())
