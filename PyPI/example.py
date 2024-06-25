from logger import Logger
import time
def main():
    logger = Logger()
 
    logger.start('test_1')
    logger.initiate_service('service-name')
    logger.error('service-name', 'some-error')
    logger.event('service-name', 1, 2, 3, 4)
    logger.terminate_service('service-name')
    time.sleep(3)
    
    logger.terminate()


if __name__ == '__main__':
    main()